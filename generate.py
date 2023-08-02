import os
from datetime import datetime

def generate_blog(title, category, date, image_urls, content):
    blog_template = f"""
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>{title}</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="../img/favicon.png" rel="icon">
  <link href="../img/favicon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="../vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="../vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="../vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="../css/style.css" rel="stylesheet">


</head>

<body>

  <main id="main">

    <!-- ======= Portfolio Details ======= -->
    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-8">
            <h2 class="portfolio-title">{title}</h2>

            <div class="portfolio-details-slider swiper">
              <div class="swiper-wrapper align-items-center">
                {"".join(f'<div class="swiper-slide"><img src="{url}" alt="" width="800"></div>' for url in image_urls)}
              </div>
              <div class="swiper-pagination"></div>
            </div>

          </div>

          <div class="col-lg-4 portfolio-info">
            <h3>Project information</h3>
            <ul>
              <li><strong>Category</strong>: {category}</li>
              <li><strong>Project date</strong>: {date}</li>
            </ul>

            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div><!-- End Portfolio Details -->

  </main><!-- End #main -->

  <div class="credits">
    <!-- All the links in the footer should remain intact. -->
    <!-- You can delete the links only if you purchased the pro version. -->
    <!-- Licensing information: https://bootstrapmade.com/license/ -->
    <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/personal-free-resume-bootstrap-template/ -->
    &copy; Yongxiang Cai 2023. All rights reserved.</a>
  </div>

  <!-- Vendor JS Files -->
  <script src="../vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/glightbox/js/glightbox.min.js"></script>
  <script src="../vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="../vendor/swiper/swiper-bundle.min.js"></script>
  <script src="../vendor/waypoints/noframework.waypoints.js"></script>
  <script src="../vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="../js/main.js"></script>

</body>

</html>
    """

    # Format the date as mm-dd-yyyy
    formatted_date = datetime.strptime(date, "%B %d, %Y").strftime("%m-%d-%y")
    output_file_path = f"{formatted_date}.html"

    with open(output_file_path, 'w') as output_file:
        output_file.write(blog_template)

# Read title, date, and content from a text file
with open('blog_data.txt', 'r') as file:
    title = file.readline().strip()
    date = file.readline().strip()
    category = file.readline().strip()
    image_urls = []
    line = file.readline().strip()
    while line:
        image_urls.append(line)
        line = file.readline().strip()
    
    content = file.read()
    content = content.replace('\n', '<br>')
    # Write the generated HTML code to an output file
    generate_blog(title, category, date, image_urls, content)