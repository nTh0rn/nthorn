---
external: false
title: "The Fractional Line Symmetry Test (Research)"
description: "An algorithm for determining poor-quality random data by symmetrically comparing the number of back-to-back bits meeting a certain criteria."
tags: ["Random", "Random numbers", "HRNG", "Photon-based hardware random number generator", "FLS Test", "bitstream"]
date: 2024-04-25
---
Written by [Nikolas Thornton](https://inspirehep.net/authors/2777386)\
Edited by [Dmitriy Beznosko](https://inspirehep.net/authors/1048916)\
Additional contributors: [Keith Driscoll](https://inspirehep.net/authors/2777384), [Fernando Guadarrama](https://inspirehep.net/authors/2577036), [Steven Mai](https://inspirehep.net/authors/2777385)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please read the paper I developed this test for, [Data Analysis Methods Preliminaries for a Photon-based Hardware Random Number Generator](https://arxiv.org/abs/2404.09395).


## The Fractional Line Symmetry Test
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Fractional Line Symmetry Test (FLS Test) is a test that I developed specifically for my [HRNG research](https://arxiv.org/abs/2404.09395) that compares how frequently bits appear back-to-back horizontally and vertically when stacked and visualized into a 2D image. The folding done to stack and visualize the data is inherently random to the bitstream length itself. Once the linear bitstream is turned into a 2D image, the number of “lines” (back-to-back bits of some length) found horizontally and vertically should be the same. This test is sensitive to poor quality random numbers that otherwise pass tests like the standard deviation and average of the bitstream. The number of lines that should be found by this test for any size bitstream is estimated using [Equation 1](#fig1).
{% table id="eq1" %}
&nbsp;
{% /table %}
![](/images/fls_test/eq1.png)
where `n` is the line search length and the bitstream length is the number of total bits in the bitstream.

### Visualization
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visualization is done by first assigning the bits colors. 1s are white pixels and 0s are black pixels. [Figure 1](#fig1) shows an example for how the bits are initially visualized. The bitstream used in [Figure 1](#fig1) will be used for the rest of this section as an example.
{% table id="fig1" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig1.png)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To ensure that the bits will eventually be able to be stacked into a perfect square to form the 2D image, the length of the bitstream must be increased. These `nothing bits` that are added are not actually a part of the bitstream, and only used for the sake of visualization in the FLS Test. To achieve this, the ceiling of the square root of the bitstream length must be taken and squared as shown in [Equation 2](#eq2).
{% table id="eq2" %}
&nbsp;
{% /table %}
![](/images/fls_test/eq2.png)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This means that `16-14=2` new `nothing bits` must be added to the bitstream, which for the sake of visualization are shown as grey pixels, as seen in [Figure 2](#fig2). Now that the bitstream length is a square number, it can be stacked left to right into a perfect square, as shown in [Figure 3](#fig3).
{% table id="fid2" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig2.png)
{% table id="fig3" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig3.png)
### Line Counting
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Line counting is the act of counting how many times a `1` or a `0` appears back-to-back a certain number of times in a row. How many times they must appear back-to-back before being considered one full line is called the `detect length`. It’s possible for bitstreams to have fractional lines. If a full line is found that has additional bits added towards the end, the additional bits are added to the total line count as `1/(detect_length)`. Using a different bitstream than what has been used in previous figures, [Figure 4](#fig4) illustrates line searching for zeros with a `detect length` of `2`.
{% table id="fig4" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig4.png)
### Horizontal Line Counting
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Horizontal line counting is easier than vertical line counting. For horizontal lines, the bitstream does not need to be stacked at any point. It can be read left-to-right linearly and searched for lines as described in [Line Counting](#line-counting). [Figure 5](#fig5) shows the bitstream used in [Figure 2](#fig2) when line searched for zeros with a `detect length` of `2`. The lines found are highlighted in blue. [Figure 6](#fig6) shows this bitstream when stacked and visualized, which demonstrates how the lines can cross the image-borders.
{% table id="fig5" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig5.png)
{% table id="fig6" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig6.png)
### Vertical Line Counting
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vertical line counting is more difficult than horizontal line counting, as it requires that the bits are first visualized and stacked as shown previously in [Figure 2](#fig2). After the bits are visualized the resulting 2D image is rotated 90 degrees counterclockwise as shown in [Figure 7](#fig7). From this, the bits are read left-to-right starting at the top left and unstacked into a linear bitstream. This is just the reverse of the visualization process described in [Visualization](#visualization). [Figure 8](#fig8) shows the bitstream after it has been unstacked.
{% table id="fig7" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig7.png)
{% table id="fig8" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig8.png)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now that the bitstream is linear, it can easily be searched for lines using the same method as horizontal lines. [Figure 9](#fig9) shows the bitstream after it has been line searched for zeros with a `detect length` of `2`. The lines found are highlighted in red. Note that a grey `nothing bit` exists in between a line, but it does not stop it from being counted as a line. This bitstream can now be restacked into a square image, and then rotated back 90 degrees clockwise, as shown in [Figure 10](#fig10).
{% table id="fig9" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig9.png)
{% table id="fig10" %}
&nbsp;
{% /table %}
![](/images/fls_test/fig10.png)
## Conclusion
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There exists an equation that calculates the theoretical number of lines that should be found for any detect length and size bitstream, but I have yet to finish writing up the emperical proof. Another possible use of the FLS Test is diagonal-line counting, as originally conceptualized by my fellow contributor, [Fernando Guadarrama](https://inspirehep.net/authors/2577036). Check out my article on a [diagonally wrapping traversal algorithm](/blog/diagonal_traversal) for a possible diagonal FLS Test implementation.