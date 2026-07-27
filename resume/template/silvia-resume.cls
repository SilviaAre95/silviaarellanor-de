\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{silvia-resume}[2026/07/27 Editorial technical resume class]

\LoadClass[10pt,letterpaper]{article}

\RequirePackage[letterpaper,left=0.55in,right=0.55in,top=0.48in,bottom=0.48in]{geometry}
\RequirePackage{fontspec}
\RequirePackage{microtype}
\RequirePackage{xcolor}
\RequirePackage{enumitem}
\RequirePackage{titlesec}
\RequirePackage{hyperref}

\definecolor{SilviaTeal}{HTML}{007A6B}
\definecolor{SilviaDarkTeal}{HTML}{005A4E}
\definecolor{SilviaInk}{HTML}{0A0E17}

\setmainfont{texgyreheros-regular.otf}[
  BoldFont=texgyreheros-bold.otf,
  ItalicFont=texgyreheros-italic.otf,
  BoldItalicFont=texgyreheros-bolditalic.otf
]
\newfontfamily\ResumeNameFont{texgyrepagella-regular.otf}[
  BoldFont=texgyrepagella-bold.otf,
  ItalicFont=texgyrepagella-italic.otf,
  BoldItalicFont=texgyrepagella-bolditalic.otf
]
\color{SilviaInk}
\pagestyle{empty}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\raggedright

\hypersetup{
  colorlinks=true,
  linkcolor=SilviaTeal,
  urlcolor=SilviaTeal,
  citecolor=SilviaTeal,
  pdfborder={0 0 0}
}

\newcommand{\ResumeHeader}[1]{%
  {\ResumeNameFont\fontsize{22}{24}\selectfont \ResumeName\par}%
  \vspace{1pt}%
  {\color{SilviaTeal}\bfseries\MakeUppercase{#1}\par}%
  \vspace{2pt}%
  {\small \ResumeContactLine\par}%
  {\small \ResumeAuthorizationLine\par}%
  \vspace{4pt}%
  {\color{SilviaTeal}\rule{\linewidth}{0.7pt}\par}%
  \vspace{5pt}%
}

\newcommand{\ResumeSection}[1]{%
  \par\vspace{7pt}%
  {\color{SilviaTeal}\bfseries\MakeUppercase{#1}\par}%
  \vspace{2pt}%
}

\newcommand{\ResumeRole}[4]{%
  {\bfseries #1} \textbar\ #2 \hfill {\small #3--#4}\par%
}

\newenvironment{ResumeBullets}{%
  \begin{itemize}[label=\textbullet,leftmargin=1.25em,itemsep=1pt,topsep=2pt,parsep=0pt,partopsep=0pt]
}{%
  \end{itemize}%
}

\newcommand{\ResumeBullet}[1]{\item #1}

\newcommand{\ResumeSkillRow}[2]{%
  \textbf{#1:} #2\par%
}

\newcommand{\ResumeEducation}[3]{%
  \textbf{#1} \hfill {\small #2}\par%
  #3\par%
}

\newcommand{\ResumeCredential}[2]{%
  \textbf{#1} \textbar\ #2\par%
}
