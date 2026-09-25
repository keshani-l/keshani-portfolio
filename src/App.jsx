import { useRef, useState } from 'react'
import './App.css'
import me from './assets/me.jpeg'
import projectCv from './assets/cv/Keshani Logathasan-cv-1.pdf'
import fullProfileCv from './assets/cv/Keshani Logathasan-cv-2.pdf'
import lostKiteVideo from './assets/lostkite/lost-kite.mp4'


/* ========================================
   LOAD PROJECT IMAGES
======================================== */

const finduImages = collectProjectImages(
  import.meta.glob('./assets/findu/*.jpg', {
    eager: true,
    import: 'default',
  }),
  'findu.jpg',
)

const sewlogixImages = collectProjectImages(
  import.meta.glob('./assets/sewlogix/*.jpg', {
    eager: true,
    import: 'default',
  }),
  'sewlogix.jpg',
)

const roverImages = collectProjectImages(
  import.meta.glob('./assets/rover/*.jpg', {
    eager: true,
    import: 'default',
  }),
  'r1.jpg',
)

const assuraImages = collectProjectImages(
  import.meta.glob('./assets/assura/*.jpg', {
    eager: true,
    import: 'default',
  }),
  'a1.jpg',
)
/* ========================================
   LOAD INDUSTRY VISIT IMAGES
======================================== */

const wso2Images = collectProjectImages(
  import.meta.glob('./assets/industry/wso2/*.jpg', {
    eager: true,
    import: 'default',
  }),
  'w1.jpg',
)

const virtusaImages = collectProjectImages(
  import.meta.glob('./assets/industry/virtusa/*.jpg', {
    eager: true,
    import: 'default',
  }),
  'v1.jpg',
)


/* ========================================
   LOAD CERTIFICATES
======================================== */

const certificateAssets = import.meta.glob(
  './assets/certificates/*.{jpg,jpeg,png,pdf}',
  {
    eager: true,
    import: 'default',
  },
)

const getCertificateAsset = (fileName) => (
  certificateAssets[`./assets/certificates/${fileName}`]
)

const certificates = [
  {
    title: 'Getting Started with DevOps on AWS',
    issuer: 'AWS Training & Certification',
    date: 'September 2026',
    image: getCertificateAsset('c1.jpg'),
    credential: getCertificateAsset('c1.jpg'),
  },
  {
    title: 'Front-End Web Development',
    issuer: 'University of Moratuwa - CODL',
    date: '2026',
    image: getCertificateAsset('c2.jpg'),
    credential: getCertificateAsset('c2.jpg'),
  },
  {
    title: 'Web Design for Beginners',
    issuer: 'University of Moratuwa - CODL',
    date: '2026',
    image: getCertificateAsset('c3.jpg'),
    credential: getCertificateAsset('c3.jpg'),
  },
  {
    title: 'Python Programming',
    issuer: 'University of Moratuwa - CODL',
    date: '2026',
    image: getCertificateAsset('c4.jpg'),
    credential: getCertificateAsset('c4.jpg'),
  },
  {
    title: 'Python for Beginners',
    issuer: 'University of Moratuwa - CODL',
    date: 'June 2026',
    image: getCertificateAsset('c5.jpg'),
    credential: getCertificateAsset('c5.jpg'),
  },
  {
    title: 'Full Stack Development',
    issuer: 'Simplilearn SkillUp',
    date: '2026',
    image: getCertificateAsset('c6.jpg'),
    credential: getCertificateAsset('c6.jpg'),
  },
  {
    title: 'Introduction to Cyber Security',
    issuer: 'Simplilearn SkillUp',
    date: '2026',
    image: getCertificateAsset('c7.jpg'),
    credential: getCertificateAsset('c7.jpg'),
  },
  {
    title: 'OOPs in Java',
    issuer: 'Simplilearn SkillUp',
    date: 'September 2025',
    image: getCertificateAsset('c8-preview.png'),
    credential: getCertificateAsset('c8.pdf'),
  },
  {
    title: 'Introduction to Generative AI Studio',
    issuer: 'Google Cloud x Simplilearn',
    date: 'June 2026',
    image: getCertificateAsset('c9-preview.png'),
    credential: getCertificateAsset('c9.pdf'),
  },
]


/* ========================================
   IMAGE SORTING
======================================== */

function collectProjectImages(images, coverImage) {
  return Object.entries(images)
    .sort(([firstPath], [secondPath]) => {
      const firstName = getFileName(firstPath)
      const secondName = getFileName(secondPath)

      if (firstName === coverImage) return -1
      if (secondName === coverImage) return 1

      return getImageNumber(firstName) - getImageNumber(secondName)
    })
    .map(([, image]) => image)
}

function getFileName(path) {
  return path.split(/[\\/]/).pop()
}

function getImageNumber(fileName) {
  const number = fileName.match(/\d+/)?.[0]

  return number
    ? Number.parseInt(number, 10)
    : Number.MAX_SAFE_INTEGER
}


/* ========================================
   IMAGE SLIDESHOW
======================================== */

function ProjectImageSequence({
  images,
  alt,
  imageFit = 'cover',
  frameAspect = '16 / 9',
}) {
  const [imageIndex, setImageIndex] = useState(0)

  const totalImages = images.length

  const preloadNextImage = () => {
    const nextImage = new Image()
    nextImage.src = images[(imageIndex + 1) % totalImages]
  }

  const showNextImage = () => {
    setImageIndex(
      (currentIndex) =>
        (currentIndex + 1) % totalImages
    )
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      showNextImage()
    }
  }

  return (
    <button
      type="button"
      className={`project-image project-image-${imageFit}`}
      style={imageFit === 'contain' ? { '--project-image-aspect': frameAspect } : undefined}
      onClick={showNextImage}
      onKeyDown={handleKeyDown}
      aria-label={`${alt}. Show next image`}
    >
      <span className="project-image-frame">

        <img
          key={images[imageIndex]}
          src={images[imageIndex]}
          alt={`${alt} image ${imageIndex + 1}`}
          loading="lazy"
          decoding="async"
          draggable="false"
          onLoad={preloadNextImage}
        />

      </span>

      <span className="image-count">
        {imageIndex + 1} / {totalImages}
      </span>

    </button>
  )
}


/* ========================================
   CERTIFICATE SLIDESHOW
======================================== */

function CertificateSequence({ items }) {
  const [certificateIndex, setCertificateIndex] = useState(0)
  const certificate = items[certificateIndex]

  const preloadNextCertificate = () => {
    const nextImage = new Image()
    nextImage.src = items[(certificateIndex + 1) % items.length].image
  }

  const showNextCertificate = () => {
    setCertificateIndex(
      (currentIndex) => (currentIndex + 1) % items.length,
    )
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      showNextCertificate()
    }
  }

  return (
    <div className="certificate-showcase">

      <div className="certificate-image-area">

        <span className="certificate-slide-number" aria-hidden="true">
          {String(certificateIndex + 1).padStart(2, '0')}
        </span>

        <button
          type="button"
          className="project-image certificate-slide"
          onClick={showNextCertificate}
          onKeyDown={handleKeyDown}
          aria-label={`${certificate.title}. Show next certificate`}
        >

          <span className="project-image-frame">

            <img
              key={certificate.image}
              src={certificate.image}
              alt={`${certificate.title} certificate`}
              loading="lazy"
              decoding="async"
              draggable="false"
              onLoad={preloadNextCertificate}
            />

          </span>

          <span className="image-count">
            {certificateIndex + 1} / {items.length}
          </span>

        </button>

      </div>


      <div className="certificate-info" aria-live="polite">

        <p className="certificate-type">
          CERTIFICATE OF COMPLETION
        </p>

        <h3>{certificate.title}</h3>

        <p className="certificate-meta">
          <span>{certificate.issuer}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{certificate.date}</span>
        </p>

        <a
          className="certificate-link"
          href={certificate.credential}
          target="_blank"
          rel="noreferrer"
        >
          View Credential <span aria-hidden="true">&#8599;</span>
        </a>

      </div>

    </div>
  )
}


/* ========================================
   APP
======================================== */

function App() {
  const [isProfilePhotoSwinging, setIsProfilePhotoSwinging] = useState(false)
  const profilePhotoRef = useRef(null)

  const resetProfilePhotoPosition = (photo = profilePhotoRef.current) => {
    if (!photo) return

    photo.style.removeProperty('--photo-swing')
    photo.style.removeProperty('--photo-shift-x')
    photo.style.removeProperty('--photo-shift-y')
    delete photo.dataset.following
  }

  const followProfilePhotoPointer = (event) => {
    const photo = event.currentTarget
    const bounds = photo.getBoundingClientRect()
    const pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
    const pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))

    setIsProfilePhotoSwinging(false)
    photo.dataset.following = 'true'
    photo.style.setProperty('--photo-swing', `${-2 + pointerX * 11}deg`)
    photo.style.setProperty('--photo-shift-x', `${pointerX * 5}px`)
    photo.style.setProperty('--photo-shift-y', `${pointerY * 3}px`)
  }

  const handleProfilePhotoPointerDown = (event) => {
    if (event.pointerType !== 'mouse') {
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    followProfilePhotoPointer(event)
  }

  const handleProfilePhotoPointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    resetProfilePhotoPosition(event.currentTarget)
  }

  const swingProfilePhoto = () => {
    resetProfilePhotoPosition()
    setIsProfilePhotoSwinging(false)

    requestAnimationFrame(() => {
      setIsProfilePhotoSwinging(true)
    })
  }

  return (
    <main>


      {/* ========================================
          HERO
      ======================================== */}

      <section className="hero-section" id="home">

        <nav className="navbar">

          <a href="#home" className="logo">
            keshani.me
          </a>

          <div className="nav-links">

            <a href="#about">
              About
            </a>

            <a href="#projects">
              Projects
            </a>

            <a href="#industry">
              Industry
            </a>

            <a href="#certificates">
              Certificates
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>

        </nav>


        <div className="sparkle sparkle-one">✦</div>
        <div className="sparkle sparkle-two">✦</div>
        <div className="sparkle sparkle-three">✧</div>
        <div className="sparkle sparkle-four">✦</div>


        <div className="hero-content">

          <p className="welcome">
            WELCOME TO MY CREATIVE SPACE
          </p>


          <div className="title-wrapper">

            <h1>
              portfolio
            </h1>

            <span className="signature">
              Keshani Logathasan
            </span>

          </div>


          <p className="hero-description">

            IT Undergraduate

            <span>•</span>

            Front-End Developer

          </p>


          <p className="university">
            University of Moratuwa
          </p>


          <div className="hero-buttons">

            <a
              href="#about"
              className="primary-button"
            >
              About Me
            </a>

            <a
              href="#projects"
              className="secondary-button"
            >
              View My Work
            </a>

            <details className="cv-menu">

              <summary className="secondary-button cv-button">
                View CV <span aria-hidden="true">↓</span>
              </summary>

              <div className="cv-options">

                <a href={projectCv} target="_blank" rel="noreferrer">
                  Project-Focused CV <span aria-hidden="true">↗</span>
                </a>

                <a href={fullProfileCv} target="_blank" rel="noreferrer">
                  Full Profile CV <span aria-hidden="true">↗</span>
                </a>

              </div>

            </details>

          </div>

        </div>


        <div className="scroll-text">
          SCROLL TO EXPLORE ↓
        </div>

      </section>


      {/* ========================================
          ABOUT
      ======================================== */}

      <section className="about-section" id="about">

        <div className="about-heading">

          <p>
            GET TO KNOW ME
          </p>

          <h2>
            A little about me <span className="star">✦</span>
          </h2>

        </div>


        <div className="about-container">


          <div className="about-photo-area">

            <div className="photo-decoration star">
              ✦
            </div>

            <button
              type="button"
              ref={profilePhotoRef}
              className={`about-photo${isProfilePhotoSwinging ? ' is-swinging' : ''}`}
              onPointerEnter={followProfilePhotoPointer}
              onPointerMove={followProfilePhotoPointer}
              onPointerDown={handleProfilePhotoPointerDown}
              onPointerUp={handleProfilePhotoPointerUp}
              onPointerLeave={(event) => resetProfilePhotoPosition(event.currentTarget)}
              onPointerCancel={(event) => resetProfilePhotoPosition(event.currentTarget)}
              onClick={swingProfilePhoto}
              onAnimationEnd={() => setIsProfilePhotoSwinging(false)}
              aria-label="Swing profile photo"
            >

              <img
                src={me}
                alt="Keshani Logathasan"
                loading="lazy"
                decoding="async"
                draggable="false"
              />

            </button>

            <p className="photo-note">
              that's me! ↗
            </p>

          </div>


          <div className="about-content">

            <h3>
              Hi, I'm <span>Keshani.</span>
            </h3>


            <p className="about-description">
              I'm an Information Technology undergraduate at the
              University of Moratuwa with an interest in front-end
              development and creating clean, user-friendly digital
              experiences.
            </p>


            <p className="about-description">
              I enjoy turning ideas into functional interfaces and
              continuously improving my skills through academic and
              personal projects. I'm currently looking for opportunities
              where I can gain industry experience, contribute to
              real-world projects, and grow as a developer.
            </p>


            <div className="about-details">


              <div className="detail">

                <span>01</span>

                <p>
                  EDUCATION
                </p>

                <h4>
                  BSc (Hons) in Information Technology
                </h4>

                <small>
                  University of Moratuwa • 2024–2028
                </small>

              </div>


              <div className="detail">

                <span>02</span>

                <p>
                  BASED IN
                </p>

                <h4>
                  Sri Lanka
                </h4>

                <small>
                  Open to opportunities
                </small>

              </div>


              <div className="detail">

                <span>03</span>

                <p>
                  FOCUS
                </p>

                <h4>
                  Front-End Development
                </h4>

                <small>
                  Web Development • UI/UX
                </small>

              </div>

            </div>


            <div className="skills-preview">

              <p>
                WHAT I WORK WITH
              </p>

              <div className="skill-tags">

                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>Angular</span>
                <span>Git</span>
                <span>GitHub</span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          PROJECTS
      ======================================== */}

      <section className="projects-section" id="projects">


        <div className="projects-heading">

          <p>
            SELECTED WORK
          </p>

          <h2>
            My Projects <span className="star">✦</span>
          </h2>

          <div className="project-category">
            PERSONAL PROJECTS
          </div>

        </div>


        <div className="projects-container">


          {/* 01 FINDU */}

          <article className="project">

            <div className="project-image-wrapper">

              <span className="project-number">
                01
              </span>

              <ProjectImageSequence
                images={finduImages}
                alt="FindU Campus Lost and Found Management System"
                imageFit="contain"
                frameAspect="1280 / 579"
              />

            </div>


            <div className="project-info">

              <p className="project-type">
                PERSONAL PROJECT
              </p>

              <h3>
                FindU
              </h3>

              <h4>
                Campus Lost &amp; Found Management System
              </h4>

              <p className="project-description">
                A full-stack web application designed to help students,
                lecturers, and staff efficiently manage lost and found
                items within a university. Users can report items, browse
                listings, submit ownership claims with proof, and track
                their reports and claims.
              </p>


              <div className="project-features">

                <span>Authentication</span>
                <span>Item Reporting</span>
                <span>Image Uploads</span>
                <span>Ownership Claims</span>
                <span>Admin Dashboard</span>

              </div>


              <div className="project-tech">

                <span>React.js</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>MySQL</span>

              </div>


              <a
                href="https://lnkd.in/gCzRdq9G"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub ↗
              </a>

            </div>

          </article>


          {/* 02 SEWLOGIX */}

          <article className="project project-reverse sewlogix-project">

            <div className="project-image-wrapper">

              <span className="project-number">
                02
              </span>

              <ProjectImageSequence
                images={sewlogixImages}
                alt="SewLogix Smart Tailoring Management System"
                imageFit="contain"
                frameAspect="1280 / 579"
              />

            </div>


            <div className="project-info">

              <p className="project-type">
                PERSONAL PROJECT
              </p>

              <h3>
                SewLogix
              </h3>

              <h4>
                Smart Tailoring Management System
              </h4>

              <p className="project-description">
                A full-stack tailoring shop management system designed
                to digitize and streamline daily business operations,
                including customer records, measurements, orders,
                inventory, payments, invoices, and reporting.
              </p>


              <div className="project-features">

                <span>Customer Management</span>
                <span>Order Tracking</span>
                <span>Inventory</span>
                <span>Payments</span>
                <span>Reports</span>
                <span>Invoice Printing</span>

              </div>


              <div className="project-tech">

                <span>React.js</span>
                <span>Vite</span>
                <span>Node.js</span>
                <span>Express.js</span>
                <span>MySQL</span>
                <span>CSS</span>

              </div>


              <a
                href="https://lnkd.in/gRb9tz4x"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub ↗
              </a>

            </div>

          </article>


          {/* GROUP PROJECTS */}

          <div className="group-projects-heading">

            <p>
              COLLABORATIVE WORK
            </p>

            <h2>
              Group Projects <span className="star">✦</span>
            </h2>

            <div className="project-category">
              GROUP PROJECTS
            </div>

          </div>


          {/* 03 THE LOST KITE */}

          <article className="project">

            <div className="project-image-wrapper">

              <span className="project-number">
                03
              </span>


              <div className="project-image project-video">

                <video
                  src={lostKiteVideo}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>

              </div>

            </div>


            <div className="project-info">

              <p className="project-type">
                GROUP PROJECT
              </p>

              <h3>
                The Lost Kite
              </h3>

              <h4>
                Story-Driven 2D Animation
              </h4>

              <p className="project-description">
                A story-driven 2D animation developed using C and
                FreeGLUT. The project follows a child flying and
                searching for a lost kite across 10 animated scenes
                while demonstrating core computer graphics concepts,
                custom rasterization algorithms, animation timing,
                and scene transitions.
              </p>


              <div className="project-features">

                <span>10 Animated Scenes</span>
                <span>Bresenham Line Drawing</span>
                <span>Circle Rendering</span>
                <span>Scene Transitions</span>
                <span>Weather Animations</span>
                <span>Keyboard Controls</span>

              </div>


              <div className="project-tech">

                <span>C</span>
                <span>OpenGL</span>
                <span>FreeGLUT</span>
                <span>Bresenham Algorithms</span>
                <span>2D Animation</span>

              </div>


              <a
                href="https://lnkd.in/gC9RDbZb"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub ↗
              </a>

            </div>

          </article>


          {/* 04 ROVERXPLORER */}

          <article className="project project-reverse rover-project">

            <div className="project-image-wrapper">

              <span className="project-number">
                04
              </span>

              <ProjectImageSequence
                images={roverImages}
                alt="RoverXplorer Environmental Monitoring Rover"
              />

            </div>


            <div className="project-info">

              <p className="project-type">
                GROUP PROJECT • FEB 2025 – JUL 2025
              </p>


              <h3>
                RoverXplorer
              </h3>


              <h4>
                Remote-Controlled Environmental Monitoring Rover
              </h4>


              <p className="project-description">
                A six-wheeled remote-controlled rover designed to
                navigate difficult terrain while collecting and
                visualizing environmental data in real time. The rover
                combines a rocker-bogie suspension system, environmental
                sensors, wireless communication, an FPV camera, and a
                web-based monitoring dashboard.
              </p>


              <div className="project-features">

                <span>Rocker-Bogie Suspension</span>
                <span>Remote Operation</span>
                <span>Environmental Sensing</span>
                <span>FPV Camera</span>
                <span>Wireless Communication</span>
                <span>Live Data Visualization</span>

              </div>


              <div className="project-contributions">

                <p>
                  MY CONTRIBUTIONS
                </p>

                <div className="contribution-list">

                  <span>Motor Control</span>
                  <span>PCB Design &amp; Fabrication</span>
                  <span>Web Dashboard Development</span>

                </div>

              </div>


              <div className="project-tech">

                <span>Arduino Mega</span>
                <span>ESP32</span>
                <span>React</span>
                <span>Python</span>
                <span>JavaScript</span>
                <span>EasyEDA</span>
                <span>LoRa</span>
                <span>Bluetooth</span>

              </div>


              <a
                href="https://github.com/Suthankan1/hardware.git"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub ↗
              </a>

            </div>

          </article>
            {/* ========================================
    05 ASSURA
======================================== */}

<article className="project assura-project">

  <div className="project-image-wrapper">

    <span className="project-number">
      05
    </span>

    <ProjectImageSequence
      images={assuraImages}
      alt="Assura Fixed Assets Management System"
      imageFit="contain"
      frameAspect="16 / 9"
    />

  </div>


  <div className="project-info">

    <p className="project-type">
      GROUP PROJECT • SECOND-YEAR SOFTWARE DEVELOPMENT PROJECT
    </p>

    <h3>
      Assura
    </h3>

    <h4>
      Fixed Assets Management System
    </h4>

    <p className="project-description">
      Assura is a full-stack Fixed Assets Management System designed
      to provide organizations with complete lifecycle visibility over
      their physical assets, from acquisition and allocation through
      transfers, maintenance, auditing, loss, and disposal. The system
      supports 10 role-based user types with dedicated permissions,
      workflows, and dashboards.
    </p>


    <div className="project-features">

      <span>Role-Based Access Control</span>
      <span>Asset Acquisition</span>
      <span>Asset Transfers</span>
      <span>Maintenance &amp; Repairs</span>
      <span>Loss &amp; Disposal</span>
      <span>Audit &amp; Reporting</span>
      <span>QR Verification</span>

    </div>


    {/* MY CONTRIBUTIONS */}

    <div className="project-contributions">

      <p>
        MY CONTRIBUTIONS
      </p>

      <div className="contribution-list">

        <span>HR Manager Pages</span>
        <span>Auditor Pages</span>
        <span>Angular Frontend</span>
        <span>Role-Based Interfaces</span>

      </div>

    </div>


    <div className="project-tech">

      <span>ASP.NET Core</span>
      <span>Angular</span>
      <span>Flutter</span>
      <span>MySQL</span>
      <span>EF Core</span>
      <span>JWT</span>
      <span>CQRS</span>
      <span>Clean Architecture</span>

    </div>

  </div>

</article> 

        </div>

      </section>


      {/* ========================================
          INDUSTRY EXPOSURE
      ======================================== */}

      <section className="industry-section" id="industry">

        <div className="industry-heading">

          <p>
            LEARNING BEYOND THE CLASSROOM
          </p>

          <h2>
            Industry Exposure <span className="star">✦</span>
          </h2>

          <p className="industry-intro">
            Opportunities that helped me connect academic learning
            with real-world technology, management, and professional
            environments.
          </p>

        </div>


        <div className="industry-container">


          {/* ========================================
              01 WSO2
          ======================================== */}

          <article className="industry-visit">

            <div className="industry-image-area">

              <span className="industry-number">
                01
              </span>

              <ProjectImageSequence
                images={wso2Images}
                alt="WSO2 Industry Visit"
              />

            </div>


            <div className="industry-info">

              <p className="industry-type">
                INDUSTRY VISIT
              </p>

              <h3>
                WSO2
              </h3>

              <h4>
                Principles of Management Module
              </h4>

              <p className="industry-description">
                Visited WSO2 as part of the Principles of Management
                module and gained valuable exposure to real-world
                management practices, organizational culture, and
                innovation within a dynamic technology environment.
                The visit provided an opportunity to understand how
                management principles are applied in the technology
                industry.
              </p>


              <div className="industry-tags">

                <span>Management Practices</span>
                <span>Innovation</span>
                <span>Tech Culture</span>
                <span>Industry Learning</span>

              </div>

            </div>

          </article>


          {/* ========================================
              02 VIRTUSA
          ======================================== */}

          <article className="industry-visit industry-reverse">

            <div className="industry-image-area">

              <span className="industry-number">
                02
              </span>

              <ProjectImageSequence
                images={virtusaImages}
                alt="Virtusa Industry Visit"
              />

            </div>


            <div className="industry-info">

              <p className="industry-type">
                INDUSTRY VISIT
              </p>

              <h3>
                Virtusa
              </h3>

              <h4>
                IT Industry Exposure
              </h4>

              <p className="industry-description">
                My industry visit to Virtusa provided valuable insights
                into real-world IT solutions, industry trends, and
                emerging technologies. Interacting with professionals
                helped me better understand the practical applications
                of my academic studies and how technology concepts are
                applied within the IT industry.
              </p>


              <div className="industry-tags">

                <span>IT Solutions</span>
                <span>Industry Trends</span>
                <span>Emerging Technologies</span>
                <span>Professional Exposure</span>

              </div>

            </div>

          </article>


        </div>

      </section>


      {/* ========================================
          CERTIFICATES & ACHIEVEMENTS
      ======================================== */}

      <section className="certificates-section" id="certificates">

        <div className="certificates-heading">

          <p>
            CERTIFICATES & ACHIEVEMENTS
          </p>

          <h2>
            Certificates <span className="star" aria-hidden="true">✦</span>
          </h2>

          <p className="certificates-intro">
            Continuous learning, practical exploration, and steady growth.
          </p>

        </div>


        <CertificateSequence items={certificates} />

      </section>


      {/* ========================================
          CONTACT
      ======================================== */}

      <section className="contact-section" id="contact">

        <div className="contact-container">

          <div className="contact-heading">

            <p>LET'S WORK TOGETHER</p>

            <h2>
              Let's <span>connect.</span>
            </h2>

            <p className="contact-intro">
              Have an opportunity, an idea, or simply want to say hello?
              Reach me through any of these channels.
            </p>

          </div>


          <div className="contact-list">

            <a className="contact-item" href="tel:+94758932859">
              <span className="contact-label">PHONE</span>
              <strong className="contact-value">075 893 2859</strong>
              <span className="contact-arrow" aria-hidden="true">&#8599;</span>
            </a>

            <a
              className="contact-item"
              href="https://wa.me/94768531149"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-label">WHATSAPP</span>
              <strong className="contact-value">076 853 1149</strong>
              <span className="contact-arrow" aria-hidden="true">&#8599;</span>
            </a>

            <a className="contact-item" href="mailto:keshanil.23@uom.lk">
              <span className="contact-label">EMAIL</span>
              <strong className="contact-value">keshanil.23@uom.lk</strong>
              <span className="contact-arrow" aria-hidden="true">&#8599;</span>
            </a>

            <a
              className="contact-item"
              href="https://www.linkedin.com/in/keshanilogathasan"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-label">LINKEDIN</span>
              <strong className="contact-value">keshanilogathasan</strong>
              <span className="contact-arrow" aria-hidden="true">&#8599;</span>
            </a>

            <a
              className="contact-item"
              href="https://github.com/keshani-l"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-label">GITHUB</span>
              <strong className="contact-value">keshani-l</strong>
              <span className="contact-arrow" aria-hidden="true">&#8599;</span>
            </a>

          </div>

        </div>


        <div className="contact-footer">
          <p>© 2026 Keshani Logathasan</p>
          <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
        </div>

      </section>


    </main>
  )
}

export default App
