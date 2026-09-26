import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ResumeData } from '../data/resumeData';

/**
 * Renders an HTML element onto a high-resolution canvas with robust handling
 * for external font stylesheets, cross-origin security rules, and CSS color functions.
 */
async function renderElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const filter = (node: Node) => {
    if (node instanceof HTMLElement && node.classList.contains('no-print')) {
      return false;
    }
    return true;
  };

  // Wait for document fonts to finish loading before rendering
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Font readiness timeout fallback
    }
  }

  // Use skipFonts: true and empty fontEmbedCSS to completely bypass reading
  // cross-origin document.styleSheets cssRules, which triggers SecurityError in browsers.
  return await toCanvas(element, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    filter,
    skipFonts: true,
    fontEmbedCSS: '',
  });
}

/**
 * Downloads a specified HTML container as high-resolution PDF
 */
export async function downloadAsPdf(
  elementId: string,
  filename = 'Deepak_Kumar_Sharma_Resume.pdf'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  // Add temporary print preparation class
  element.classList.add('exporting-pdf');

  try {
    const canvas = await renderElementToCanvas(element);

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    const isSinglePageMode =
      element.classList.contains('single-page-a4-fit') ||
      Boolean(element.querySelector('.single-page-a4-fit'));

    if (isSinglePageMode || imgHeight <= pdfHeight * 1.08) {
      // Exactly 1-page fit: scale proportionally to ensure zero spillover
      const scale = Math.min(1, pdfHeight / imgHeight);
      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;
      const xOffset = (pdfWidth - finalWidth) / 2;
      pdf.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight, undefined, 'FAST');
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Additional pages if resume spans longer than 1 page
      while (heightLeft > 10) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(filename);
  } finally {
    element.classList.remove('exporting-pdf');
  }
}

/**
 * Downloads a specified element as high-resolution PNG image
 */
export async function downloadAsImage(
  elementId: string,
  filename = 'Deepak_Kumar_Sharma_Resume.png'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  element.classList.add('exporting-image');
  try {
    const canvas = await renderElementToCanvas(element);
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    element.classList.remove('exporting-image');
  }
}

/**
 * Generates and triggers download of a clean, Microsoft Word-compliant .doc file
 * formatted with semantic headings, tables, and standard fonts for ATS parsing.
 */
export function downloadAsWordDoc(
  data: ResumeData,
  filename = 'Deepak_Kumar_Sharma_Resume.doc'
): void {
  const docHtml = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' 
        xmlns:w='urn:schemas-microsoft-com:office:word' 
        xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset="utf-8">
    <title>${data.personalInfo.name} - Resume</title>
    <style>
      body {
        font-family: Calibri, Arial, sans-serif;
        font-size: 11pt;
        line-height: 1.35;
        color: #111827;
        margin: 20mm;
      }
      h1 {
        font-size: 22pt;
        color: #0B2545;
        margin-bottom: 2pt;
        text-transform: uppercase;
        letter-spacing: 0.5pt;
      }
      .headline {
        font-size: 11pt;
        font-weight: bold;
        color: #134074;
        margin-bottom: 8pt;
      }
      .contact-bar {
        font-size: 9.5pt;
        color: #4B5563;
        margin-bottom: 14pt;
        border-bottom: 1.5pt solid #0B2545;
        padding-bottom: 6pt;
      }
      h2 {
        font-size: 13pt;
        color: #0B2545;
        text-transform: uppercase;
        border-bottom: 1pt solid #D1D5DB;
        padding-bottom: 3pt;
        margin-top: 14pt;
        margin-bottom: 6pt;
      }
      h3 {
        font-size: 11pt;
        font-weight: bold;
        color: #1F2937;
        margin-top: 8pt;
        margin-bottom: 2pt;
      }
      .subhead {
        font-size: 10pt;
        font-weight: bold;
        color: #4B5563;
        margin-bottom: 4pt;
      }
      ul {
        margin-top: 3pt;
        margin-bottom: 8pt;
        padding-left: 20px;
      }
      li {
        margin-bottom: 3pt;
        font-size: 10.5pt;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 6pt;
        margin-bottom: 10pt;
      }
      th {
        background-color: #F3F4F6;
        color: #111827;
        font-weight: bold;
        font-size: 10pt;
        border: 1px solid #D1D5DB;
        padding: 6pt;
        text-align: left;
      }
      td {
        border: 1px solid #D1D5DB;
        padding: 5pt;
        font-size: 10pt;
      }
      .badge {
        display: inline-block;
        background: #EEF2F6;
        padding: 2pt 6pt;
        margin: 2pt;
        font-size: 9.5pt;
        border-radius: 3pt;
      }
    </style>
  </head>
  <body>
    <h1>${data.personalInfo.name}</h1>
    <div class="headline">${data.personalInfo.headline}</div>
    <div class="contact-bar">
      Phone: ${data.personalInfo.displayPhone} | 
      Email: ${data.personalInfo.email} | 
      Location: ${data.personalInfo.location}<br>
      LinkedIn: ${data.personalInfo.linkedinDisplay} | 
      Website: ${data.personalInfo.website} | 
      YouTube: Gyanpur Express
    </div>

    <h2>Professional Summary</h2>
    <p>${data.personalInfo.summaryLead}</p>
    ${data.personalInfo.summaryDetails.map(p => `<p>${p}</p>`).join('')}

    <h2>Key Highlights & Availability</h2>
    <ul>
      ${data.quickMetrics.map(m => `<li><strong>${m.label}:</strong> ${m.value} - ${m.detail}</li>`).join('')}
    </ul>

    <h2>Technical Skills & Expertise</h2>
    ${data.skillsCategories.map(cat => `
      <p><strong>${cat.category}:</strong> ${cat.skills.map(s => s.name).join(', ')}</p>
    `).join('')}
    <p><strong>Core Strengths:</strong> ${data.coreStrengths.join(', ')}</p>

    <h2>Work Experience</h2>
    ${data.experiences.map(exp => `
      <h3>${exp.role}</h3>
      <div class="subhead">${exp.company} | ${exp.location || ''} | ${exp.duration} (${exp.type})</div>
      ${exp.notes ? `<p><em>${exp.notes}</em></p>` : ''}
      <ul>
        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      ${exp.technologies ? `<p><strong>Technologies:</strong> ${exp.technologies.join(', ')}</p>` : ''}
    `).join('')}

    <h2>Projects & Digital Presence</h2>
    ${data.projects.map(proj => `
      <h3>${proj.title} (${proj.role})</h3>
      <p>${proj.description} ${proj.url ? `<em>[Link: ${proj.url}]</em>` : ''}</p>
      <ul>
        ${proj.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <p><strong>Tech Stack:</strong> ${proj.techStack.join(', ')}</p>
    `).join('')}

    <h2>Education</h2>
    <table>
      <thead>
        <tr>
          <th>Qualification</th>
          <th>Board / University</th>
          <th>Year</th>
          <th>Score / CGPA</th>
        </tr>
      </thead>
      <tbody>
        ${data.education.map(edu => `
          <tr>
            <td><strong>${edu.qualification}</strong><br><small>${edu.institution}</small></td>
            <td>${edu.boardOrUniversity}</td>
            <td>${edu.year}</td>
            <td>${edu.score}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2>Certifications</h2>
    <ul>
      ${data.certifications.map(c => `<li><strong>${c.name}</strong> - ${c.issuer} (${c.tag})</li>`).join('')}
    </ul>

    <h2>Additional Information</h2>
    <ul>
      <li><strong>Languages Known:</strong> ${data.additionalInfo.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}</li>
      <li><strong>Nationality:</strong> ${data.additionalInfo.nationality}</li>
      <li><strong>Notice Period:</strong> ${data.additionalInfo.noticePeriod}</li>
      <li><strong>Willing to Relocate:</strong> ${data.additionalInfo.willingToRelocate}</li>
      <li><strong>Work Availability:</strong> ${data.additionalInfo.availability}</li>
      <li><strong>Passport Status:</strong> ${data.additionalInfo.passport}</li>
    </ul>

    <h2>Declaration</h2>
    <p>${data.declaration.text}</p>
    <p><strong>${data.declaration.signee}</strong><br>Date: ${new Date().toLocaleDateString('en-GB')}</p>
  </body>
  </html>
  `;

  const blob = new Blob(['\ufeff', docHtml], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates clean ATS-optimized Plain Text format
 */
export function generateAtsPlainText(data: ResumeData): string {
  const separator = '='.repeat(70);
  const subSeparator = '-'.repeat(70);

  return `${data.personalInfo.name.toUpperCase()}
${data.personalInfo.headline}
Phone: ${data.personalInfo.displayPhone} | Email: ${data.personalInfo.email}
Location: ${data.personalInfo.location}
LinkedIn: ${data.personalInfo.linkedinDisplay} | Website: ${data.personalInfo.website}
YouTube: Gyanpur Express | Instagram: @deepikamakeupstudiobbk

${separator}
PROFESSIONAL SUMMARY
${separator}
${data.personalInfo.summaryLead}

${data.personalInfo.summaryDetails.join('\n\n')}

${separator}
KEY METRICS & AVAILABILITY
${separator}
* Experience: 2+ Years in Banking & Enterprise IT Support
* Users Supported: 100+ daily across 8 Indian States
* SLA Compliance: SLA-driven incident management & escalations
* Notice Period: Immediate / 15 Days (Work From Home / Remote / Relocation)

${separator}
TECHNICAL SKILLS
${separator}
${data.skillsCategories.map(cat => `${cat.category.toUpperCase()}:\n${cat.skills.map(s => s.name).join(', ')}`).join('\n\n')}

CORE STRENGTHS:
${data.coreStrengths.join(', ')}

${separator}
WORK EXPERIENCE
${separator}
${data.experiences.map(exp => `
ROLE: ${exp.role}
COMPANY: ${exp.company}
DURATION: ${exp.duration} | TYPE: ${exp.type}
LOCATION: ${exp.location || 'N/A'}
${exp.notes ? `NOTE: ${exp.notes}\n` : ''}Key Responsibilities:
${exp.highlights.map(h => `  * ${h}`).join('\n')}
${exp.technologies ? `Technologies: ${exp.technologies.join(', ')}\n` : ''}
${subSeparator}`).join('\n')}

${separator}
ONLINE PROJECTS & DIGITAL PRESENCE
${separator}
${data.projects.map(proj => `
PROJECT: ${proj.title}
ROLE: ${proj.role} | TYPE: ${proj.type}
URL: ${proj.url || 'N/A'}
Description: ${proj.description}
Key Deliverables:
${proj.features.map(f => `  * ${f}`).join('\n')}
Tech Stack: ${proj.techStack.join(', ')}
${subSeparator}`).join('\n')}

${separator}
EDUCATION
${separator}
${data.education.map(edu => `* ${edu.qualification}
  Institution: ${edu.institution} (${edu.boardOrUniversity})
  Year: ${edu.year} | Score: ${edu.score}`).join('\n\n')}

${separator}
CERTIFICATIONS
${separator}
${data.certifications.map(c => `* ${c.name} - ${c.issuer} [${c.tag}]`).join('\n')}

${separator}
ADDITIONAL INFORMATION
${separator}
* Languages: ${data.additionalInfo.languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
* Nationality: ${data.additionalInfo.nationality}
* Notice Period: ${data.additionalInfo.noticePeriod}
* Willing to Relocate: ${data.additionalInfo.willingToRelocate}
* Availability: ${data.additionalInfo.availability}
* Passport: ${data.additionalInfo.passport}

${separator}
DECLARATION
${separator}
${data.declaration.text}
Candidate: ${data.declaration.signee}
`;
}

/**
 * Downloads ATS Plain Text file (.txt)
 */
export function downloadAsAtsText(
  data: ResumeData,
  filename = 'Deepak_Kumar_Sharma_ATS_Resume.txt'
): void {
  const text = generateAtsPlainText(data);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies plain text ATS resume to clipboard
 */
export async function copyAtsTextToClipboard(data: ResumeData): Promise<boolean> {
  try {
    const text = generateAtsPlainText(data);
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Native direct print (uses print CSS stylesheets)
 */
export function triggerDirectPrint(): void {
  window.print();
}
