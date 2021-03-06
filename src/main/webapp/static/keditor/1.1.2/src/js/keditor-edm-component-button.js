/**
 * KEditor Button Component
 * @copyright: Kademi (http://kademi.co)
 * @author: Kademi (http://kademi.co)
 * @version: @{version}
 * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
 */
(function ($) {
    var KEditor = $.keditor;
    var flog = KEditor.log;

    KEditor.components['button'] = {
        init: function (contentArea, container, component, keditor) {
            // Do nothing
        },

        getContent: function (component, keditor) {
            flog('getContent "button" component', component);

            var componentContent = component.children('.keditor-component-content');
            return componentContent.html();
        },

        destroy: function (component, keditor) {
            // Do nothing
        },

        settingEnabled: true,

        settingTitle: 'Button Settings',

        initSettingForm: function (form, keditor) {
            flog('initSettingForm "button" component');
            form.append(
                '<form class="form-horizontal">' +
                '    <div class="form-group">' +
                '       <div class="col-md-12">' +
                '           <label>Color</label>' +
                '           <div class="input-group button-color-picker">' +
                '               <span class="input-group-addon"><i></i></span>' +
                '               <input type="text" value="" id="button-color" class="form-control" />' +
                '           </div>' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group button-text">' +
                '       <label for="button-border-radius" class="col-sm-12">Border Radius</label>' +
                '       <div class="col-sm-12">' +
                '           <input type="number" id="button-border-radius" class="form-control" />' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <div class="col-md-12">' +
                '           <label>Inner Padding (in px)</label>' +
                '           <div class="row row-sm text-center">' +
                '               <div class="col-xs-4 col-xs-offset-4">' +
                '                   <input type="number" value="" class="button-inner-padding-top form-control" />' +
                '                   <small>top</small>' +
                '               </div>' +
                '           </div>' +
                '           <div class="row row-sm text-center">' +
                '               <div class="col-xs-4">' +
                '                   <input type="number" value="" class="button-inner-padding-left form-control" />' +
                '                   <small>left</small>' +
                '               </div>' +
                '               <div class="col-xs-4 col-xs-offset-4">' +
                '                   <input type="number" value="" class="button-inner-padding-right form-control" />' +
                '                   <small>right</small>' +
                '               </div>' +
                '           </div>' +
                '           <div class="row row-sm text-center">' +
                '               <div class="col-xs-4 col-xs-offset-4">' +
                '                   <input type="number" value="" class="button-inner-padding-bottom form-control" />' +
                '                   <small>bottom</small>' +
                '               </div>' +
                '           </div>' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group button-text">' +
                '       <label for="button-text" class="col-sm-12">Text</label>' +
                '       <div class="col-sm-12">' +
                '           <input type="text" id="button-text" class="form-control" />' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group button-text">' +
                '       <label for="button-text" class="col-sm-12">Link</label>' +
                '       <div class="col-sm-12">' +
                '           <input type="text" id="button-link" class="form-control" />' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <div class="col-md-12">' +
                '           <label>Text color</label>' +
                '           <div class="input-group button-color-text-picker">' +
                '               <span class="input-group-addon"><i></i></span>' +
                '               <input type="text" value="" id="button-text-color" class="form-control" />' +
                '           </div>' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group button-text">' +
                '       <label for="button-font-size" class="col-sm-12">Font Size</label>' +
                '       <div class="col-sm-12">' +
                '           <input type="number" id="button-font-size" class="form-control" />' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group button-text">' +
                '       <label for="button-font-family" class="col-sm-12">Font Family</label>' +
                '       <div class="col-sm-12">' +
                '           <select id="button-font-family" class="form-control">' +
                '               <option value="">None</option>' +
                '               <option value="arial,helvetica,sans-serif;">Arial</option>' +
                '               <option value="comic sans ms,cursive;">Comic Sans MS</option>' +
                '               <option value="courier new,courier,monospace;">Courier New</option>' +
                '               <option value="lucida sans unicode,lucida grande,sans-serif;">Lucida Sans Unicode</option>' +
                '               <option value="tahoma,geneva,sans-serif;">Tahoma</option>' +
                '               <option value="times new roman,times,serif;">Times New Roman</option>' +
                '               <option value="trebuchet ms,helvetica,sans-serif;">Trebuchet MS</option>' +
                '               <option value="verdana,geneva,sans-serif;">Verdana</option>' +
                '           </select>' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label class="col-sm-12">Font Style</label>' +
                '       <div class="col-sm-12">' +
                '           <button type="button" class="btn btn-sm btn-default btn-bold"><i class="fa fa-bold"></i></button>' +
                '           <button type="button" class="btn btn-sm btn-default btn-italic"><i class="fa fa-italic"></i></button>' +
                '       </div>' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label class="col-sm-12">Alignment</label>' +
                '       <div class="col-sm-12">' +
                '           <button type="button" class="btn btn-sm btn-default btn-button-left"><i class="fa fa-align-left"></i></button>' +
                '           <button type="button" class="btn btn-sm btn-default btn-button-center"><i class="fa fa-align-center"></i></button>' +
                '           <button type="button" class="btn btn-sm btn-default btn-button-right"><i class="fa fa-align-right"></i></button>' +
                '           <button type="button" class="btn btn-sm btn-default btn-button-full"><i class="fa fa-align-justify"></i></button>' +
                '       </div>' +
                '    </div>' +
                '</form>'
            );

            form = form.find('form');
            KEditor.initPaddingControls(keditor, form, 'prepend');
            KEditor.initBgColorControl(keditor, form, 'prepend');

            var buttonColorPicker = form.find('.button-color-picker');
            initColorPicker(buttonColorPicker, function (color) {
                var buttonWrapper = keditor.getSettingComponent().find('.button-wrapper');

                if (color && color !== 'transparent') {
                    setStyle(buttonWrapper, 'background-color', color);
                    buttonWrapper.attr('bgcolor', color);
                } else {
                    setStyle(buttonWrapper, 'background-color', '');
                    buttonWrapper.removeAttr('bgcolor');
                    form.find('.button-color').val('');
                }
            });

            var txtBorderRadius = form.find('#button-border-radius');
            txtBorderRadius.on('change', function () {
                setStyle(keditor.getSettingComponent().find('.button-wrapper'), 'border-radius', this.value + 'px');
            });

            var buttonInnerPaddingTop = form.find('.button-inner-padding-top');
            var buttonInnerPaddingBottom = form.find('.button-inner-padding-bottom');
            var buttonInnerPaddingLeft = form.find('.button-inner-padding-left');
            var buttonInnerPaddingRight = form.find('.button-inner-padding-right');
            buttonInnerPaddingTop.on('change', function () {
                setStyle(keditor.getSettingComponent().find('.button-inner'), 'padding-top', (this.value > 0 ? this.value : 0) + 'px');
            });
            buttonInnerPaddingBottom.on('change', function () {
                setStyle(keditor.getSettingComponent().find('.button-inner'), 'padding-bottom', (this.value > 0 ? this.value : 0) + 'px');
            });
            buttonInnerPaddingLeft.on('change', function () {
                setStyle(keditor.getSettingComponent().find('.button-inner'), 'padding-left', (this.value > 0 ? this.value : 0) + 'px');
            });
            buttonInnerPaddingRight.on('change', function () {
                setStyle(keditor.getSettingComponent().find('.button-inner'), 'padding-right', (this.value > 0 ? this.value : 0) + 'px');
            });

            var txtText = form.find('#button-text');
            txtText.on('change', function () {
                var text = this.value || '';
                text = text.trim();

                keditor.getSettingComponent().find('.button-wrapper a').text(text);
            });


            var txtLink = form.find('#button-link');
            txtLink.on('change', function () {
                var href = this.value || '';
                href = href.trim();

                keditor.getSettingComponent().find('.button-wrapper a').attr("href", href);
            });

            var buttonTextColorPicker = form.find('.button-color-text-picker');
            initColorPicker(buttonTextColorPicker, function (color) {
                var button = keditor.getSettingComponent().find('.button-wrapper a');

                if (color && color !== 'transparent') {
                    setStyle(button, 'color', color);
                } else {
                    setStyle(button, 'color', '');
                    form.find('.button-text-color').val('');
                }
            });

            var txtFontSize = form.find('#button-font-size');
            txtFontSize.on('change', function () {
                setStyle(keditor.getSettingComponent().find('.button-wrapper a'), 'font-size', (this.value > 0 ? this.value : 0) + 'px');
            });

            var cbbFontFamily = form.find('#button-font-family');
            cbbFontFamily.on('change', function () {
                setStyle(keditor.getSettingComponent().find('.button-wrapper a'), 'font-family', this.value);
            });

            var btnBold = form.find('.btn-bold');
            btnBold.on('click', function (e) {
                e.preventDefault();

                var style = '';
                if (btnBold.hasClass('active')) {
                    btnBold.removeClass('active');
                } else {
                    btnBold.addClass('active');
                    style = 'bold';
                }
                setStyle(keditor.getSettingComponent().find('.button-wrapper a'), 'font-weight', style);
            });

            var btnItalic = form.find('.btn-italic');
            btnItalic.on('click', function (e) {
                e.preventDefault();

                var style = '';
                if (btnItalic.hasClass('active')) {
                    btnItalic.removeClass('active');
                } else {
                    btnItalic.addClass('active');
                    style = 'italic';
                }
                setStyle(keditor.getSettingComponent().find('.button-wrapper a'), 'font-style', style);
            });

            var btnAlignLeft = form.find('.btn-button-left');
            var btnAlignCenter = form.find('.btn-button-center');
            var btnAlignRight = form.find('.btn-button-right');
            var btnAlignFull = form.find('.btn-button-full');
            var setAlign = function (trigger, align) {
                var table = keditor.getSettingComponent().find('.button-wrapper');

                btnAlignLeft.removeClass('active');
                btnAlignCenter.removeClass('active');
                btnAlignRight.removeClass('active');
                btnAlignFull.removeClass('active');

                trigger.addClass('active');
                if (align === 'full') {
                    table.attr('width', '100%').attr('align', 'center');
                } else {
                    table.removeAttr('width').attr('align', align);
                }
            };

            btnAlignLeft.on('click', function (e) {
                e.preventDefault();

                if (!btnAlignLeft.hasClass('active')) {
                    setAlign(btnAlignLeft, 'left');
                }
            });
            btnAlignCenter.on('click', function (e) {
                e.preventDefault();

                if (!btnAlignCenter.hasClass('active')) {
                    setAlign(btnAlignCenter, 'center');
                }
            });
            btnAlignRight.on('click', function (e) {
                e.preventDefault();

                if (!btnAlignRight.hasClass('active')) {
                    setAlign(btnAlignRight, 'right');
                }
            });
            btnAlignFull.on('click', function (e) {
                e.preventDefault();

                if (!btnAlignFull.hasClass('active')) {
                    setAlign(btnAlignFull, 'full');
                }
            });
        },

        showSettingForm: function (form, component, keditor) {
            flog('showSettingForm "button" component', component);

            KEditor.showBgColorControl(keditor, form, component);
            KEditor.showPaddingControls(keditor, form, component);

            var buttonWrapper = component.find('.button-wrapper');
            var buttonInner = buttonWrapper.find('.button-inner');
            var button = buttonInner.find('a');

            var buttonColorPicker = form.find('.button-color-picker');
            buttonColorPicker.colorpicker('setValue', buttonWrapper.css('background-color') || '');

            var txtBorderRadius = form.find('#button-border-radius');
            var borderRadius = buttonWrapper.css('border-radius');
            txtBorderRadius.val(borderRadius ? borderRadius.replace('px', '') : '');

            var buttonInnerPaddingTop = form.find('.button-inner-padding-top');
            var paddingTop = buttonInner.css('padding-top');
            buttonInnerPaddingTop.val(paddingTop ? paddingTop.replace('px', '') : '0');

            var buttonInnerPaddingBottom = form.find('.button-inner-padding-bottom');
            var paddingBottom = buttonInner.css('padding-bottom');
            buttonInnerPaddingBottom.val(paddingBottom ? paddingBottom.replace('px', '') : '0');

            var buttonInnerPaddingLeft = form.find('.button-inner-padding-left');
            var paddingLeft = buttonInner.css('padding-left');
            buttonInnerPaddingLeft.val(paddingLeft ? paddingLeft.replace('px', '') : '0');

            var buttonInnerPaddingRight = form.find('.button-inner-padding-right');
            var paddingRight = buttonInner.css('padding-right');
            buttonInnerPaddingRight.val(paddingRight ? paddingRight.replace('px', '') : '0');

            var txtText = form.find('#button-text');
            txtText.val(button.text());

            var txtLink = form.find('#button-link');
            txtLink.val(button.attr("href"));

            var buttonTextColorPicker = form.find('.button-color-text-picker');
            buttonTextColorPicker.colorpicker('setValue', button.css('color') || '');

            var txtFontSize = form.find('#button-font-size');
            var fontSize = button.css('font-size');
            txtFontSize.val(fontSize ? fontSize.replace('px', '') : '');

            var cbbFontFamily = form.find('#button-font-family');
            cbbFontFamily.val(button.css('font-family'));

            var btnBold = form.find('.btn-bold');
            var fontWeight = button.css('font-weight');
            btnBold[fontWeight === '700' || fontWeight === 'bold' ? 'addClass' : 'removeClass']('active');

            var btnItalic = form.find('.btn-italic');
            btnItalic[button.css('font-style') === 'italic' ? 'addClass' : 'removeClass']('active');

            var btnAlignLeft = form.find('.btn-button-left');
            var btnAlignCenter = form.find('.btn-button-center');
            var btnAlignRight = form.find('.btn-button-right');
            var btnAlignFull = form.find('.btn-button-full');
            btnAlignLeft.removeClass('active');
            btnAlignCenter.removeClass('active');
            btnAlignRight.removeClass('active');
            btnAlignFull.removeClass('active');
            if (buttonWrapper.attr('width') === '100%') {
                btnAlignFull.addClass('active');
            } else {
                var align = buttonWrapper.attr('align');
                switch (align) {
                    case 'left':
                        btnAlignLeft.addClass('active');
                        break;

                    case 'center':
                        btnAlignCenter.addClass('active');
                        break;

                    case 'right':
                        btnAlignRight.addClass('active');
                        break;
                }
            }
        },

        hideSettingForm: function (form) {
            // Do nothing
        }
    };

})(jQuery);
