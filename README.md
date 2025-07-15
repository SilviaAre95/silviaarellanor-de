# Silvia Arellano - Data Engineer Profile

<div align="center">
  <pre>
   ____        _          _____             _                       
  |  _ \  __ _| |_ __ _  | ____|_ __   __ _(_)_ __   ___  ___ _ __ 
  | | | |/ _` | __/ _` | |  _| | '_ \ / _` | | '_ \ / _ \/ _ \ '__|
  | |_| | (_| | || (_| | | |___| | | | (_| | | | | |  __/  __/ |   
  |____/ \__,_|\__\__,_| |_____|_| |_|\__, |_|_| |_|\___|\___|_|   
                                      |___/                         
  </pre>
</div>

## About This Project

This is my personal profile webpage showcasing my journey as a Senior Data Engineer. The site highlights my expertise in building scalable data infrastructure, ETL pipelines, and cloud-based data solutions.

## Credits & Attribution

This project is based on the original portfolio template created by **[Nazmul Hossain](https://github.com/seraprogrammer/portfolio)**. I've made significant modifications to adapt it for my data engineering profile, including:

- Complete redesign focused on data engineering skills and projects
- Added new sections for Blog (Medium articles) and Digital Products
- Custom Experience timeline with professional journey
- Industry banner showing sectors I've worked in
- Customized color scheme and styling
- Updated content to reflect data engineering expertise
- Integration with data-specific tools and technologies showcase
- Mobile-responsive design optimizations

Special thanks to Nazmul Hossain for creating the excellent foundation that made this profile webpage possible.

---

## Demo

![Portfolio Demo](https://i.postimg.cc/Dfr5jCQp/Screenshot-2025-01-02-120901.png)

---

## Live Preview

Check out the live version of my data engineering profile:  
[**Live Demo**](https://silviaare95.github.io/silviaarellanor-de/)
---
### 🎯 Project Structure
```bash
portfolio/
├── public/
│   ├── favicon files (apple-touch-icon.png, favicon-32x32.png, etc.)
│   └── site.webmanifest
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── index.css
│   │   └── images/
│   │       ├── portfolio.png
│   │       └── silvia.png
│   ├── components/
│   │   ├── ui/
│   │   │   ├── flip-words.jsx
│   │   │   └── other reusable components
│   │   ├── Footer.jsx
│   │   └── IndustryBanner.jsx
│   ├── pages/
│   │   ├── Blog/
│   │   │   └── Blog.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Experience/
│   │   │   └── Experience.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Hero/
│   │   │   └── Hero.jsx
│   │   ├── Products/
│   │   │   └── Products.jsx
│   │   ├── Projects/
│   │   │   └── Projects.jsx
│   │   └── Skills/
│   │       └── Skills.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```
---

## Sections of the Profile

This profile webpage consists of the following sections:

- **Hero**: Introduction with personal photo and overview of data engineering expertise
- **Skills**: Comprehensive list of data engineering tools and technologies with interactive cards
- **Experience**: Professional timeline showcasing both full-time and independent projects
- **Projects**: Two-column layout featuring professional and open-source projects
- **Industry Banner**: Animated banner displaying industries I've worked in
- **Blog**: Featured articles from my Medium blog on data engineering topics
- **Products**: Dedicated page for digital products and resources (accessible via navigation)
- **Contact**: Professional contact form with EmailJS integration and social links

---

## 💻 Technologies Used
- **Frontend:** React.js with Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS with custom color scheme
- **Animations:** Framer Motion & custom CSS animations
- **Icons:** React Icons (FontAwesome)
- **Email Service:** EmailJS for contact form
- **Deployment:** GitHub Pages
- **Build Tool:** Vite with custom GitHub Pages configuration

---

## Installation ⬇️

You will need to download **Git** and **Node** to run this project.

### Git

- Download and install Git from the official website: [Git Downloads](https://git-scm.com/)
- Verify the installation:
  ```bash
  git --version
  ```

### Node

- Download and install Node.js from the official website: [Node.js Downloads](https://nodejs.org/)
- Make sure you have the latest version of both Git and Node on your computer.
- Verify the installation:
  ```bash
  node --version
  ```

# Getting Started 🎯

### Fork and Clone the Repository 🚀
1. Click the **Fork** button at the top-right corner of the page to create your own copy of the repository.
2. After forking, open your terminal and run the following commands to clone the repo:

  ```bash
  git clone https://github.com/SilviaAre95/silviaarellanor-de.git
  ```
Navigate to the Project Directory 📂
Once the repository is cloned, change your directory to the project folder:
```bash
cd silviaarellanor-de
```

Install Dependencies ⚙️
From the root directory of your project, install the necessary packages:
```bash
npm install
```

Run the Development Server 🚀
Start the development server to see your project live:
```bash
npm run dev
```

View the Project 🌐
Open your browser and visit http://localhost:5173/ to see the result! 🎉

## 🚀 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages:

### Environment Setup
1. Copy `.env.example` to `.env` and add your EmailJS credentials:
   ```bash
   cp .env.example .env
   ```

### Deploy to GitHub Pages
1. Push your changes to the main branch
2. Run the deployment command:
   ```bash
   npm run deploy
   ```
   This will:
   - Build the project for production
   - Deploy to the `gh-pages` branch
   - Make your site available at `https://yourusername.github.io/repositoryname/`

### GitHub Pages Configuration
- The site is configured with the correct base path for GitHub Pages
- Vite automatically handles asset paths for subdirectory deployment
- React Router is configured with the appropriate basename for production

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Original template by <a href="https://github.com/seraprogrammer">Nazmul Hossain</a></p>
  <p>Adapted and modified by <a href="https://github.com/SilviaAre95">Silvia Arellano</a> for Data Engineering Profile</p>
</div>

