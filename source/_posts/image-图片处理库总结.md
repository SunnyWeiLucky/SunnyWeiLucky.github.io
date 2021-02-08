---
title: image-图片处理库总结
categories: [Media,image]
tags:
abbrlink: 3226112650
date: 2020-01-15 09:47:54
---

### 一，提取exif信息的库

[Exif](https://www.exiv2.org/)

~~~
Exiv2 是一个用来提取图片中的EXIF、LPTC 和 XMP 元数据信息的C++类库。同时还提供了命令行工具。示例代码： Exiv2::Image::AutoPtr image =Exiv2::ImageFactory::open(argv[1]);assert(image.get() != 0);image->readMetadata(); Exi... 更多Exiv2信息 
~~~

[libvips](https://github.com/libvips/libvips)

~~~
libvips是一个需求驱动的水平线程 图像处理库。与类似的库相比，libvips运行迅速且几乎不占用内存。libvips是根据LGPL 2.1+许可的。

它具有约300种运算， 涵盖算术，直方图，卷积，形态运算，频率滤波，颜色，重采样，统计等。它支持多种数字类型，从8位int到128位复数。图像可以具有任意数量的波段。它支持各种图像格式，包括JPEG，TIFF，PNG，WebP，HEIC，FITS，Matlab，OpenEXR，PDF，SVG，HDR，PPM / PGM / PFM，CSV，GIF，分析，NIfTI，DeepZoom和OpenSlide 。它还可以通过ImageMagick或GraphicsMagick加载图像，使其与DICOM等格式一起使用。

主要用这个处理苹果平台heic图片格式的转码
~~~

[CImg](http://cimg.eu/)

~~~
就一个.h文件所以用起来很简明，但感觉功能上不如CxImage。可以与CxImage配合使用，因为CImg提供了基于
lapack的矩阵运算函数和完善的线性滤波卷积函数，同时CImg做像素运算还是很方便的。另外，独有Display类可以方便的
实现各种显示，包括显示图像、打字、画线等等。还有，该库有个基于光流的多尺度图像配准例子，很好.

使用很方便，但是对于特殊的格式如heic，相机原生格式不支持
~~~



[libraw](https://www.libraw.org/docs)

~~~
LibRaw是一个用于从数码相机读取RAW文件的库（CRW / CR2，NEF，RAF，DNG，MOS，KDC，DCR等，实际上支持所有RAW格式）。

它特别注意正确检索后续RAW转换所需的数据。

该库旨在使用RAW文件作为初始数据嵌入RAW转换器，数据分析器和其他程序中。
~~~



[CxImage](https://www.codeproject.com/Articles/1300/CxImage)

~~~
对CxImage考察的印象：该开发包完全开放源代码，图像封装为一个类，功能极为强大，与Windows、MFC支持极好，支
持图像的多种操作（线性滤波、中值滤波、直方图操作、旋转缩放、区域选取、阈值处理、膨胀腐蚀、alpha混合等等），支
持从文件、内存或者win32api定义的位图图像格式中读取图像，支持将图像显示在任意窗口，功能可谓很强大了，而且对像
素的操作很方便，另外还有一个界面很强的demo，可以直接在上面进行二次开发，推荐使用！
缺点：里面的子库很多，用起来可能较麻烦；而且感觉速度稍慢，不如后面提到的freeimage
但功能真的十分强大啊！

主要使用这个处理相机原生图片，可以linux下自己不会编译
~~~

[OpenCV](https://opencv.org/)

~~~
对OpenCV的印象：功能十分的强大，而且支持目前先进的图像处理技术，体系十分完善，操作手册很详细，手册首先给大
家补计算机视觉的知识，几乎涵盖了近10年内的主流算法；然后将图像格式和矩阵运算，然后将各个算法的实现函数。我用
它来做了一个Harris角点检测器和Canny边缘检测器，总共就花了一个小时（第一次用OpenCV）。而且该库显示图像极其
方便，两句话就可以。但该库似乎不大稳定，对32F和16S、8U的图像数据支持上bug重重。我用cvFilter2D函数进行线性
滤波，屡屡出错，后来一查原来是大bug。后来用cvmGet来取矩阵元素也是频繁出错，仔细检查了N遍确保程序没问题之后
在yahoogroup上找到答案：仍然是bug。。。但好歹该库是开放的，所以自己可以修改；而且支持CVS。另外该库用的是
IPL矩阵库，速度奇快～～

目前没有使用
~~~

