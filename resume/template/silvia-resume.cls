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

\definecolor{SilviaInk}{HTML}{000000}

% Ligatures=NoCommon keeps the extracted text layer plain ASCII. TeX Gyre
% Heros maps its ffi glyph to U+FB00 (ff) in ToUnicode, so "efficient" would
% otherwise extract as "e<U+FB00>icient" and never match an ATS keyword search.
\setmainfont{texgyreheros-regular.otf}[
  BoldFont=texgyreheros-bold.otf,
  ItalicFont=texgyreheros-italic.otf,
  BoldItalicFont=texgyreheros-bolditalic.otf,
  Ligatures=NoCommon
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

\newlength{\ResumeSectionBeforeSkip}
\newlength{\ResumeRoleBeforeSkip}
\newlength{\ResumeBulletAfterSkip}
\setlength{\ResumeSectionBeforeSkip}{5pt}
\setlength{\ResumeRoleBeforeSkip}{2.5pt}
\setlength{\ResumeBulletAfterSkip}{0pt}

\AtBeginDocument{%
  \providecommand{\ResumeContactLine}{}%
  \providecommand{\ResumeContactBlock}{{\fontsize{8pt}{9.5pt}\selectfont\ResumeContactLine}}%
  \fontsize{9.6pt}{12pt}\selectfont
}

\hypersetup{
  colorlinks=true,
  linkcolor=SilviaInk,
  urlcolor=SilviaInk,
  citecolor=SilviaInk,
  pdfborder={0 0 0}
}

\newcommand{\ResumeVectorIcon}[1]{%
  \tikz[x=1.60ex,y=1.60ex,baseline=-0.38ex]{%
    \path[use as bounding box] (0,0) rectangle (1.4,1.2);
    #1%
  }%
}

\newcommand{\ResumeIconEnvelope}{%
  \ResumeVectorIcon{%
    \fill[SilviaInk,rounded corners=0.10ex] (0.06,0.12) rectangle (1.34,1.08);
    \fill[white] (0.16,0.88) -- (0.70,0.48) -- (1.24,0.88) --
      (1.24,0.96) -- (0.70,0.57) -- (0.16,0.96) -- cycle;
  }%
}

% The inner curve sits further up-right than the outer one so the handset
% carries the same optical weight as the solid envelope and LinkedIn marks,
% and the outer control point stays at y >= 0 to respect the bounding box.
\newcommand{\ResumeIconPhone}{%
  \ResumeVectorIcon{%
    \fill[SilviaInk]
      (0.17,1.09) -- (0.49,1.00) -- (0.58,0.73) -- (0.44,0.62)
      .. controls (0.57,0.47) and (0.74,0.35) .. (0.96,0.28)
      -- (1.05,0.41) -- (1.29,0.37) -- (1.34,0.06)
      .. controls (0.83,0.02) and (0.21,0.38) .. (0.07,0.85)
      -- cycle;
  }%
}

% Equator plus a meridian ring, not a full cross: wide white bars through the
% centre make the disc read as a crosshair rather than a sphere. The meridian
% is a white ellipse knocked back by a black one, so the mark stays filled.
\newcommand{\ResumeIconGlobe}{%
  \ResumeVectorIcon{%
    \fill[SilviaInk] (0.70,0.60) circle (0.56);
    \fill[white] (0.70,0.60) ellipse (0.29 and 0.56);
    \fill[SilviaInk] (0.70,0.60) ellipse (0.23 and 0.50);
    \fill[white] (0.16,0.575) rectangle (1.24,0.625);
  }%
}

\newcommand{\ResumeIconLinkedIn}{%
  \ResumeVectorIcon{%
    \fill[SilviaInk,rounded corners=0.10ex] (0.10,0.03) rectangle (1.30,1.17);
    \fill[white] (0.28,0.24) rectangle (0.46,0.69);
    \fill[white] (0.37,0.89) circle (0.11);
    \fill[white] (0.60,0.24) rectangle (0.78,0.69);
    \fill[white] (0.72,0.61)
      .. controls (0.91,0.80) and (1.14,0.69) .. (1.14,0.43)
      -- (1.14,0.24) -- (0.96,0.24) -- (0.96,0.45)
      .. controls (0.96,0.57) and (0.86,0.63) .. (0.78,0.55) -- cycle;
  }%
}

\newcommand{\ResumeContactItem}[3]{%
  \href{#2}{\textcolor{SilviaInk}{#1\hspace{0.45em}#3}}\par%
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
  {\color{SilviaInk}\rule{\linewidth}{0.7pt}\par}%
}

\newcommand{\ResumeSection}[1]{%
  \par\vspace{\ResumeSectionBeforeSkip}%
  {\color{SilviaInk}\rule{\linewidth}{0.45pt}\par}%
  \vspace{1.5pt}%
  {\centering\ResumeNameFont\fontsize{11.5pt}{13pt}\selectfont\bfseries
    \MakeUppercase{#1}\par}%
  \vspace{1.5pt}%
}

\newcommand{\ResumeOpeningSection}[1]{%
  \par\vspace{\ResumeSectionBeforeSkip}%
  {\centering\ResumeNameFont\fontsize{11.5pt}{13pt}\selectfont\bfseries
    \MakeUppercase{#1}\par}%
  \vspace{1.5pt}%
}

\newcommand{\ResumeLeadershipLayout}{%
  \fontsize{9.6pt}{13.3pt}\selectfont
  \setlength{\ResumeSectionBeforeSkip}{9pt}%
  \setlength{\ResumeRoleBeforeSkip}{4pt}%
  \setlength{\ResumeBulletAfterSkip}{4pt}%
}

\newcommand{\ResumeRole}[4]{%
  \par\vspace{\ResumeRoleBeforeSkip}%
  {\fontsize{9.6pt}{12pt}\selectfont\bfseries
    #2\hfill#3--#4\par%
    #1\par}%
}

\newenvironment{ResumeBullets}{%
  \fontsize{9.6pt}{12pt}\selectfont
  \begin{itemize}[label=\textbullet,leftmargin=1.2em,itemsep=1.4pt,topsep=1.5pt,parsep=0pt,partopsep=0pt]
}{%
  \end{itemize}\vspace{\ResumeBulletAfterSkip}%
}

\newcommand{\ResumeBullet}[1]{\item #1}
\newcommand{\ResumeProjectBullet}[2]{\item \textbf{#1.} #2}
\newcommand{\ResumeLanguage}[2]{\textbf{#1} -- #2\par}

\newcommand{\ResumeSkillCell}[1]{%
  \parbox[t]{0.24\linewidth}{%
    \raggedright\fontsize{8.7pt}{10.4pt}\selectfont
    \if\relax\detokenize{#1}\relax
      \strut
    \else
      \hangindent=0.9em\hangafter=1\textbullet\hspace{0.35em}#1\strut
    \fi
  }%
}

\newcommand{\ResumeSkillGridRow}[4]{%
  \noindent\makebox[\linewidth][l]{%
    \ResumeSkillCell{#1}\hfill
    \ResumeSkillCell{#2}\hfill
    \ResumeSkillCell{#3}\hfill
    \ResumeSkillCell{#4}%
  }\par
}

\newcommand{\ResumeSkillGrid}[1]{%
  \begingroup#1\endgroup
}

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
