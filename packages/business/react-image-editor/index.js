import React from 'react';
import ImageEditor, { TABS, TOOLS } from './src';

const EditorImg = ({ source, saveImage, imgFormat }) => {
  let isModifed = false;

  const config = {
    source,
    useBackendTranslations: false,
    avoidChangesNotSavedAlertOnLeave: true,
    // defaultSavedImageName: '随便填',
    defaultSavedImageType: imgFormat,
    onModify: () => {
      isModifed = true;
    },
    onBeforeSave: imageFileInfo => {
      imageFileInfo.name = '随便填';
      return false;
    },
    onSave: (imageData, designState) => {
      return saveImage(isModifed, imageData, designState);
    },
    annotationsCommon: {
      fill: '#ff0000',
    },
    Text: {
      text: '标注',
    },
    Rotate: {
      angle: 90,
      componentType: 'slider',
    },
    Crop: {
      presetsItems: [],
      presetsFolders: [],
    },
    // tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK],
    defaultTabId: TABS.ANNOTATE,
    defaultToolId: TOOLS.TEXT,
    translations: {
      adjustTab: '裁剪',
      finetuneTab: '微调',
      filtersTab: '过滤',
      watermarkTab: '水印',
      annotateTab: '标注',
      resizeTab: '尺寸',
      save: '保存',
      stroke: '边框',
      opacity: '透明度',
      textTool: '文本',
      rectangleTool: '矩形',
      ellipseTool: '椭圆',
      polygonTool: '多边形',
      penTool: '曲线',
      lineTool: '直线',
      arrowTool: '箭头',
      flipX: '水平翻转',
      unFlipX: '水平翻转',
      unFlipY: '垂直翻转',
      flipY: '垂直翻转',
      brightnessTool: '亮度',
      contrastTool: '对比度',
      hsvTool: '饱和度',
      blurTool: '模糊',
      saturation: '饱和度',
      hue: '色调',
      value: '值',
      imageTool: '图像',
      warmthTool: '暖色调',
      fitSize: '自适应',
      actualSize: '实际大小',
    }
  };
  return <ImageEditor { ...config }/>
};

export default EditorImg;
