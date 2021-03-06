(function ($) {
    $.fn.mselect = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jquery.mselect');
        }
    };

    $.fn.mselect.DEFAULT = {
        btnClass: 'btn btn-success',
        btnOkClass: 'btn btn-sm btn-primary',
        modalTitle: 'Select file',
        contentTypes: ['image', 'video', 'audio'],
        excludedEndPaths: ['.mil/'],
        basePath: '/',
        pagePath: window.location.pathname,
        bs3Modal: false,
        showModal: function (modal) {
            modal.modal('show');
        },
        onSelectFile: function (selectedUrl, selectedRelUrl) {
        },
        useModal: true
    };

    var methods = {
        init: function (options) {
            var config = $.extend({}, $.fn.mselect.DEFAULT, options);
            var target = this;
            var count = 0;
            var f = function () {
                count++;

                if (count === 3) {
                    flog('[jquery.mselect] Initializing mselect', config, target);
                    if (config.useModal) {
                        flog('[jquery.mselect] Initializing button and modal...', config, target);
                        target.on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            var modal;
                            if (config.bs3Modal) {
                                modal = getModalBS3(config);
                            } else {
                                modal = getModal(config);
                            }
                            config.showModal(modal);
                        });
                    } else {
                        flog('[jquery.mselect] Initializing mselect container only', config, target);

                        target.html(getSelectContainer(config));
                        initSelectContainer(target, config);
                    }

                    flog('[jquery.mselect] Initialized mselect');
                }
            };

            $.getScriptOnce('/static/js/jquery.jstree.js', f);
            $.getScriptOnce('/static/js/jquery.milton-tree.js', f);
            $.getScriptOnce('/static/milton-upload/1.0.1/jquery.milton-upload.js', f);
        }
    };

    function getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    function isImage(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                //etc
                return true;
        }
        return false;
    }

    function isVideo(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                // etc
                return true;
        }
        return false;
    }

    function isAudio(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            // Since jwplayer supports mp3, aac and Vorbis
            case 'mp3':
            case 'aac':
            case 'ogg':
            case 'oga':
                // etc
                return true;
        }
        return false;
    }

    function getAcceptedFiles(contentTypes) {
        return contentTypes.map(function (a) {
            return a + '/*'
        }).join(',');
    }

    function initSelectContainer(container, config, onOk) {
        flog('[jquery.mselect] initSelectContainer', container, config);

        var tree = container.find('div.milton-tree-wrapper');
        var previewContainer = container.find('.milton-preview');

        tree.mtree({
            basePath: config.basePath,
            pagePath: config.pagePath,
            excludedEndPaths: config.excludedEndPaths,
            includeContentTypes: config.contentTypes,
            onselectFolder: function (n) {
            },
            onselectFile: function (n, selectedUrl, hash) {
                if (isVideo(selectedUrl)) {
                    previewContainer.html('<div class="jp-video" data-hash="' + hash + '"></div>');
                    $.getScript('/static/jwplayer/6.10/jwplayer.js', function () {
                        jwplayer.key = 'cXefLoB9RQlBo/XvVncatU90OaeJMXMOY/lamKrzOi0=';
                        buildJWPlayer(previewContainer.find('div.jp-video'), 100, selectedUrl, selectedUrl + '/alt-640-360.png');
                    });
                } else if (isAudio(selectedUrl)) {
                    previewContainer.html('<div class="jp-audio" data-hash="' + hash + '" style="padding: 15px"><div id="kaudio-player-100" /></div>');
                    $.getScript('/static/jwplayer/6.10/jwplayer.js', function () {
                        jwplayer.key = 'cXefLoB9RQlBo/XvVncatU90OaeJMXMOY/lamKrzOi0=';
                        buildJWAudioPlayer(100, selectedUrl, false);
                    });
                }
                else if (isImage(selectedUrl)) {
                    previewContainer.html('<img src="' + selectedUrl + '" data-hash="' + hash + '" />');
                } else {
                    previewContainer.html('<p class="alert alert-warning">Unsupported preview file</p>')
                }

                previewContainer.attr('data-url', selectedUrl);
            }
        });

        $('#milton-btn-upload-file').mupload({
            url: config.basePath,
            acceptedFiles: getAcceptedFiles(config.contentTypes),
            buttonText: '<i class="fa fa-upload"></i>',
            oncomplete: function (data, name, href) {
                flog('[jquery.mselect] oncomplete', data);
                //tree.mtree('addFile', name, href, hash);
                addFileToTree(name, href, tree);
                url = href;
            }
        });

        container.find('.btn-ok').click(function () {
            var url = previewContainer.attr('data-url');

            if (url) {
                var relUrl = url.substring(config.basePath.length, url.length);
                flog('[jquery.mselect] Selected', url, relUrl);

                if (typeof config.onSelectFile === 'function') {
                    var hash = previewContainer.children('[data-hash]').attr('data-hash');
                    var fileType = 'other';
                    if (isVideo(url)) {
                        fileType = 'video';
                    } else if (isImage(url)) {
                        fileType = 'image';
                    } else if (isAudio(url)) {
                        fileType = 'audio';
                    }

                    config.onSelectFile.call(this, url, relUrl, fileType, hash);
                }

                if (typeof onOk === 'function') {
                    onOk.call(this);
                }
            } else {
                flog('[jquery.mselect] No selected file!');
            }
        });
    }

    function addFileToTree(name, href, tree) {
        var t = "/_DAV/PROPFIND?fields=milton:hash";
        flog("addFileToTree", href + t);
        $.ajax({
            url: href + t,
            cache: false
        }).done(function (data) {
            var hash = data[0].hash;
            flog("addFileToTree", data, hash);
            tree.mtree('addFile', name, href, hash);
        });
    }

    function getSelectContainer(config) {
        var extraElement = '';

        if (!config.useModal) {
            extraElement += '<button type="button" class="btn btn-primary btn-ok"><i class="fa fa-check"></i></button>';
        }

        return (
                '<div class="milton-file-select-container">' +
                '    <div class="row">' +
                '        <div class="col-xs-4"><div class="milton-tree-wrapper"></div></div>' +
                '        <div class="col-xs-8">' +
                '            <div id="milton-btn-upload-file"></div>' + extraElement +
                '            <div class="milton-preview"></div>' +
                '        </div>' +
                '    </div>' +
                '</div>'
                );
    }

    function getModal(config) {
        flog('[jquery.mselect] getModal', config);

        var modal = $('#modal-milton-file-select');
        if (modal.length === 0) {
            $('body').append(
                    '<div id="modal-milton-file-select" class="modal modal-md fade" aria-hidden="true" tabindex="-1">' +
                    '   <div class="modal-header">' +
                    '       <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>' +
                    '       <h4 class="modal-title">' + config.modalTitle + '</h4>' +
                    '   </div>' +
                    '   <div class="modal-body">' + getSelectContainer(config) + '</div>' +
                    '   <div class="modal-footer">' +
                    '<button class="' + config.btnOkClass + ' btn-ok" type="button"> OK </button>' +
                    '   </div>' +
                    '</div>'
                    );
            modal = $('#modal-milton-file-select');

            initSelectContainer(modal, config, function () {
                modal.modal('hide');
            });
        }

        return modal;
    }

    function getModalBS3(config) {
        flog('[jquery.mselect] getModal', config);

        var modal = $('#modal-milton-file-select');
        if (modal.length === 0) {
            $('body').append(
                    '<div id="modal-milton-file-select" class="modal modal-md fade" aria-hidden="true" tabindex="-1">' +
                    '   <div class="modal-dialog">' +
                    '       <div class="modal-content">' +
                    '           <div class="modal-header">' +
                    '               <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>' +
                    '               <h4 class="modal-title">' + config.modalTitle + '</h4>' +
                    '           </div>' +
                    '           <div class="modal-body">' + getSelectContainer(config) + '</div>' +
                    '           <div class="modal-footer">' +
                    '               <button class="' + config.btnOkClass + ' btn-ok" type="button"> OK </button>' +
                    '           </div>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>'
                    );
            modal = $('#modal-milton-file-select');

            initSelectContainer(modal, config, function () {
                modal.modal('hide');
            });
        }

        return modal;
    }
})(jQuery);
