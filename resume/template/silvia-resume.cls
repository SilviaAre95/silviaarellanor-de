\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{silvia-resume}[2026/07/27 Editorial technical resume class]

\LoadClass[10pt,letterpaper]{article}

\RequirePackage[letterpaper,left=0.30in,right=0.30in,top=0.28in,bottom=0.30in]{geometry}
\RequirePackage{fontspec}
\RequirePackage{microtype}
\RequirePackage{xcolor}
\RequirePackage{enumitem}
\RequirePackage{hyperref}
\RequirePackage{tikz}

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

\AtBeginDocument{%
  \providecommand{\ResumeContactLine}{}%
  \providecommand{\ResumeContactBlock}{{\fontsize{8pt}{9.5pt}\selectfont\ResumeContactLine}}%
  \fontsize{9.6pt}{12pt}\selectfont
}

\hypersetup{
  colorlinks=true,
  linkcolor=SilviaTeal,
  urlcolor=SilviaTeal,
  citecolor=SilviaTeal,
  pdfborder={0 0 0}
}

\newcommand{\ResumeVectorIcon}[1]{%
  \tikz[x=1ex,y=1ex,baseline=-0.55ex,line width=0.11ex,line cap=round,line join=round]{%
    \path[use as bounding box] (0,0) rectangle (1.4,1.2);
    #1%
  }%
}

\newcommand{\ResumeIconEnvelope}{%
  \ResumeVectorIcon{%
    \draw (0.12,0.18) rectangle (1.28,1.02);
    \draw (0.12,0.94) -- (0.70,0.52) -- (1.28,0.94);
    \draw (0.12,0.18) -- (0.54,0.57);
    \draw (1.28,0.18) -- (0.86,0.57);
  }%
}

\newcommand{\ResumeIconPhone}{%
  \ResumeVectorIcon{%
    \draw[line width=0.23ex]
      (0.28,0.99) .. controls (0.10,0.72) and (0.31,0.36) .. (0.65,0.20)
      .. controls (0.88,0.09) and (1.09,0.14) .. (1.21,0.32);
    \draw[line width=0.18ex] (0.18,1.02) -- (0.40,0.88);
    \draw[line width=0.18ex] (1.08,0.18) -- (1.26,0.38);
  }%
}

\newcommand{\ResumeIconGlobe}{%
  \ResumeVectorIcon{%
    \draw (0.70,0.60) circle (0.50);
    \draw (0.70,0.10)
      .. controls (0.42,0.34) and (0.42,0.86) .. (0.70,1.10);
    \draw (0.70,0.10)
      .. controls (0.98,0.34) and (0.98,0.86) .. (0.70,1.10);
    \draw (0.24,0.40) -- (1.16,0.40);
    \draw (0.24,0.80) -- (1.16,0.80);
  }%
}

\newcommand{\ResumeIconLinkedIn}{%
  \ResumeVectorIcon{%
    \draw[rounded corners=0.12ex] (0.15,0.08) rectangle (1.25,1.12);
    \fill (0.38,0.82) circle (0.08);
    \draw[line width=0.16ex] (0.38,0.58) -- (0.38,0.27);
    \draw[line width=0.16ex] (0.65,0.27) -- (0.65,0.60);
    \draw[line width=0.16ex]
      (0.65,0.49) .. controls (0.82,0.70) and (1.04,0.62) .. (1.04,0.27);
  }%
}

\newcommand{\ResumeContactItem}[3]{%
  \href{#2}{\textcolor{SilviaTeal}{#1}\hspace{0.45em}\textcolor{SilviaInk}{#3}}\par%
}

\newcommand{\ResumeHeader}[1]{%
  \noindent
  \begin{minipage}[t]{0.60\linewidth}
    \vspace{0pt}%
    {\ResumeNameFont\fontsize{24pt}{26pt}\selectfont \ResumeName\par}%
    \vspace{2pt}%
    {\fontsize{12pt}{14pt}\selectfont\bfseries #1\par}%
  \end{minipage}\hfill
  \begin{minipage}[t]{0.38\linewidth}
    \vspace{0pt}%
    \raggedleft\small\ResumeContactBlock
  \end{minipage}%
  \par\vspace{4pt}%
  {\small \ResumeAuthorizationLine\par}%
  \vspace{3pt}%
  {\color{SilviaTeal}\rule{\linewidth}{0.7pt}\par}%
}

\newcommand{\ResumeSection}[1]{%
  \par\vspace{5pt}%
  {\color{SilviaTeal}\rule{\linewidth}{0.45pt}\par}%
  \vspace{1.5pt}%
  {\ResumeNameFont\fontsize{11.5pt}{13pt}\selectfont\bfseries
    \MakeUppercase{#1}\par}%
  \vspace{1.5pt}%
}

\newcommand{\ResumeRole}[4]{%
  \par\vspace{2.5pt}%
  {\bfseries #2}\hfill{\bfseries #3--#4}\par%
  {\bfseries #1}\par%
}

\newenvironment{ResumeBullets}{%
  \begin{itemize}[label=\textbullet,leftmargin=1.2em,itemsep=1.4pt,topsep=1.5pt,parsep=0pt,partopsep=0pt]
}{%
  \end{itemize}%
}

\newcommand{\ResumeBullet}[1]{\item #1}
\newcommand{\ResumeProjectBullet}[2]{\item \textbf{#1.} #2}
\newcommand{\ResumeLanguage}[2]{\textbf{#1} -- #2\par}

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
