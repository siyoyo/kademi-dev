var url = '';
var src = '';
var width = 300;
var height = 38;
var autoStart = false;
var audioInitDone = false;
function buildAudioPlayerPreview(path, container){
    var audiotag = document.createElement("audio");
    audiotag.setAttribute("controls", "controls");
    var source = document.createElement('source');
    source.setAttribute('src',path);
    audiotag.appendChild(source);
    audiotag.load();
    audiotag.style.width = '300px';
    container.appendChild(audiotag);
    $('#myAudioSettings').removeClass('hide');
}

CKEDITOR.plugins.add('embed_audio', {
    init: function (editor) {
        var iconPath = this.path + 'images/icon.png';
        var audioImage = this.path + 'images/audio.jpg';

        editor.addCommand('audioDialog', new CKEDITOR.dialogCommand('audioDialog'));

        editor.ui.addButton('Audio', {
            label: 'Insert Audio',
            command: 'audioDialog',
            toolbar: 'insert,2',
            icon: iconPath
        });

        if (editor.contextMenu) {
            editor.addMenuGroup('audioGroup');
            editor.addMenuItem('audioItem', {
                label: 'Edit Audio',
                icon: iconPath,
                command: 'audioDialog',
                group: 'audioGroup'
            });
            editor.contextMenu.addListener(function (element) {
                if (element) {
                    element = element.getAscendant('img', true);
                }
                if (element && !element.isReadOnly() && element.data('kaudio')) {
                    log("Found a audio!", element);
                    return {
                        audioItem: CKEDITOR.TRISTATE_ON
                    };
                }
                return null;
            });
        }

        // These interfere with page themes, but might need to be put back somehow for editor layout
        // 
        editor.element.getDocument().appendStyleSheet(this.path + 'audioPlugin.css');
        editor.element.getDocument().appendStyleSheet('/static/common/plugin.css');

        $.getScriptOnce(('/static/js/jquery.jstree.js'));
        //$.getScriptOnce(('/static/js/jquery.hotkeys.js'));
        $.getScriptOnce(('/static/js/jquery.cookie.js'));

        $.getScriptOnce("/static/js/jquery-fileupload-9.5.2/js/jquery.iframe-transport.js");
        $.getScriptOnce("/static/js/jquery-fileupload-9.5.2/js/vendor/jquery.ui.widget.js");
        $.getScriptOnce("/static/js/jquery-fileupload-9.5.2/js/jquery.fileupload.js");



        var pagePath = toFolderPath(window.location.pathname);
        CKEDITOR.dialog.add('audioDialog', function (editor) {
            log("add to editor", editor);
            return {
                title: 'Insert/Edit Audio',
                minWidth: 900,
                minHeight: 480,
                contents: [
                    {
                        id: 'audio',
                        label: 'Insert/Edit Audio',
                        elements: [
                            {
                                type: 'html',
                                html: '<div class="row" style="width: 100%; max-width: 900px">'
                                + '  <div class="col-md-4">'
                                + '    <div id="myAudioTree" class="tree"></div>'
                                + '  </div>'
                                + '  <div class="col-md-8">'
                                + '    <div role="tabpanel">'
                                + '      <ul class="nav nav-tabs" role="tablist" id="imageTabs">'
                                + '        <li role="presentation" class="active"><a href="#ckaudioupload" aria-controls="ckaudioupload" role="tab" data-toggle="tab">Upload</a></li>'
                                + '        <li role="presentation"><a href="#ckaudiopreview" aria-controls="ckaudiopreview" role="tab" data-toggle="tab">Preview</a></li>'
                                + '      </ul>'
                                + '      <div class="tab-content">'
                                + '        <div role="tabpanel" class="tab-pane fade active in" id="ckaudioupload">'
                                + '          <div class="myUploaded"></div>'
                                + '        </div>'
                                + '        <div role="tabpanel" class="tab-pane fade" id="ckaudiopreview">'
                                + '          <div id="myAudioPreview"></div>'
                                + '          <div id="myAudioSettings" class="hide">'
                                + '             <label for="txtWidth">Width</label>'
                                + '             <input type="number" id="txtWidth" value="300"> <br/>'
                                + '             <label for="txtAutoStart">Auto Play <input type="checkbox" id="txtAutoStart"></label>'
                                + '             <p>* Please be noted that Auto Play will not work on mobile devices due to security reason</p>'
                                + '          </div>'
                                + '        </div>'
                                + '      </div>'
                                + '    </div>' // end tabpabel
                                + '  </div>' // end col-md-8
                                + '</div>', // end row
                                commit: function (data) {
                                    log("commit, data=", data);
                                }
                            }
                        ]
                    }
                ],
                onShow: function () {

                    var sel = editor.getSelection();
                    var element = sel.getStartElement();
                    flog("onShow", sel, element, editor, editor.getData());
                    if (!element || element.getName() != 'img' || !element.data('kaudio') ) {
                        element = editor.document.createElement('img');
                        element.setAttribute('src', audioImage);
                        element.setAttribute('width', width);
                        element.setAttribute('height', height);
                        element.setAttribute('data-kaudio', url);
                        this.insertMode = true;
                    } else {
                        this.insertMode = false;
                        src = element.data("kaudio");
                        url = src;
                        log("update mode", url, src);
                    }
                    this.element = element;
                    if(url){
                        var container = document.getElementById('myAudioPreview');
                        container.innerHTML = '';
                        buildAudioPlayerPreview(url, container);
                    }
                    this.setupContent(this.element);
                    if(!audioInitDone){
                        audioInitDone = true;
                        $("#myAudioTree").mtree({
                            basePath: pagePath,
                            pagePath: "",
                            excludedEndPaths: [".mil/"],
                            includeContentTypes: ["audio"],
                            onselectFolder: function (n) {
                                var selectedVideoUrl = $("#myAudioTree").mtree("getSelectedFolderUrl");
                                log("onselect: folder=", url);
                                $(".myUploaded").mupload("setUrl", selectedVideoUrl);
                            },
                            onselectFile: function (n, selectedVideoUrl) {
                                url = selectedVideoUrl;
                                log("selected file", n, url);
                                var container = document.getElementById('myAudioPreview');
                                container.innerHTML = '';
                                buildAudioPlayerPreview(url, container);
                            },
                            isInCkeditor: true
                        });
                        $(".myUploaded").mupload({
                            isInCkeditor: true,
                            buttonText: "Upload video",
                            useDropzone: true,
                            oncomplete: function (data, name, href) {
                                log("oncomplete", data);
                                $("#myAudioTree").mtree("addFile", name, href);
                                url = href;
                                var container = document.getElementById('myAudioPreview');
                                container.innerHTML = '';
                                buildAudioPlayerPreview(url, container);
                            }
                        });
                        $('#txtWidth').on('change', function(e){
                            width = this.value;
                            $("#myAudioPreview").find('audio').css('width',width);
                        });

                        $('#txtAutoStart').on('change', function(e){
                            autoStart = this.checked;
                            $("#myAudioPreview").find('audio').prop('autoplay', autoStart);
                        });
                    }
                },
                onOk: function () {
                    var img = this.element;
                    var returnUrl = url;
                    if (returnUrl.startsWith("/")) {
                        returnUrl = returnUrl.substring(pagePath.length + 1); // convert to relative path
                    }
                    log("onOk", url, pagePath, "=", returnUrl);
                    img.setAttribute("data-kaudio", returnUrl);
                    img.setAttribute("data-kaudio", returnUrl);
                    img.setAttribute('width', width);
                    img.setAttribute('data-width', width);
                    img.setAttribute('height', height);
                    img.setAttribute('data-autostart', autoStart);
                    if (this.insertMode) {
                        log("inserted", img);
                        editor.insertElement(img);
                    } else {
                        log('update element');
                        editor.updateElement();
                    }
                    this.commitContent(img);
                    log("commit content", img);
                },
                onHide: function(){
                    var audioPreview = $('#myAudioPreview').find('audio')[0];
                    if(audioPreview && typeof audioPreview.pause === 'function'){
                        audioPreview.pause();
                        audioPreview.currentTime = 0;
                    }
                }
            };
        });
    }
});
