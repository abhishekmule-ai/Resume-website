const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb, PDFName, PDFString } = require('pdf-lib');

async function generateResumePdf() {
  const doc = await PDFDocument.create();
  
  // Set document metadata
  doc.setTitle('Abhishek Mule - Resume');
  doc.setAuthor('Abhishek Mule');
  doc.setSubject('Resume / Curriculum Vitae');
  doc.setKeywords(['Abhishek Mule', 'Resume', 'Computer Science', 'AI & ML', 'Web Developer', 'Video Editor']);
  doc.setProducer('Antigravity Resume Builder');
  doc.setCreator('Abhishek Mule Portfolio');

  // A4 Page dimensions (points)
  const pageWidth = 595.28;
  const pageHeight = 841.90;
  const page = doc.addPage([pageWidth, pageHeight]);

  // Embed standard fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Palette matching design
  const colorTitle = rgb(0.0902, 0.1961, 0.3020);     // #17324D Navy
  const colorSubtitle = rgb(0.1843, 0.4196, 0.5412);  // #2F6B8A Slate Blue
  const colorMuted = rgb(0.2941, 0.3333, 0.3882);     // #4B5563 Muted Gray
  const colorBody = rgb(0.1255, 0.1647, 0.2039);      // #202A34 Dark Charcoal
  const colorLine = rgb(0.8431, 0.8784, 0.9098);      // #D7E0E8 Light Divider

  const leftMargin = 57.0;
  const rightMargin = pageWidth - 57.0;
  const contentWidth = rightMargin - leftMargin;

  let y = 780;

  // --- HEADER ---
  // Name
  page.drawText('Abhishek Mule', {
    x: leftMargin,
    y: y,
    size: 23,
    font: fontBold,
    color: colorTitle,
  });

  y -= 22;
  // Subtitle
  page.drawText('CSE (AI & ML) Student | Web Developer | Video Editor | AWS Cloud Club Volunteer', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontRegular,
    color: colorSubtitle,
  });

  y -= 17;
  // Contact row
  const contactPrefix = 'Mumbai, Maharashtra, India   |   phosion10@gmail.com   |   ';
  page.drawText(contactPrefix, {
    x: leftMargin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });

  const prefixWidth = fontRegular.widthOfTextAtSize(contactPrefix, 8.5);
  const linkedInX = leftMargin + prefixWidth;
  const linkedInText = 'LinkedIn Profile';
  page.drawText(linkedInText, {
    x: linkedInX,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorSubtitle,
  });

  const linkedInWidth = fontRegular.widthOfTextAtSize(linkedInText, 8.5);

  // Add LinkedIn annotation link
  const linkAnnotation = doc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [linkedInX, y - 2, linkedInX + linkedInWidth, y + 10],
    Border: [0, 0, 0],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: PDFString.of('https://www.linkedin.com/in/abhishek-mule-ba84332b5/?isSelfProfile=true'),
    },
  });
  const linkAnnotationRef = doc.context.register(linkAnnotation);
  page.node.set(PDFName.of('Annots'), doc.context.obj([linkAnnotationRef]));

  y -= 14;
  // Divider line
  page.drawLine({
    start: { x: leftMargin, y: y },
    end: { x: rightMargin, y: y },
    thickness: 1,
    color: colorLine,
  });

  // --- PROFESSIONAL SUMMARY ---
  y -= 24;
  page.drawText('PROFESSIONAL SUMMARY', {
    x: leftMargin,
    y: y,
    size: 11,
    font: fontBold,
    color: colorTitle,
  });

  y -= 16;
  const summaryLines = [
    'Second-year Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, with skills in',
    'front-end and back-end web development and video editing. Interested in building practical digital solutions, creating',
    'engaging video content, and contributing to collaborative technology projects.',
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: leftMargin,
      y: y,
      size: 9,
      font: fontRegular,
      color: colorBody,
    });
    y -= 13;
  }

  // --- TECHNICAL SKILLS ---
  y -= 10;
  page.drawText('TECHNICAL SKILLS', {
    x: leftMargin,
    y: y,
    size: 11,
    font: fontBold,
    color: colorTitle,
  });

  y -= 18;
  const skillsList = [
    {
      label: 'Web Development: ',
      content: 'HTML, CSS, JavaScript, React.js, Node.js, Tailwind CSS, Wordpress, Netlify, Vercel',
    },
    {
      label: 'Other Languages: ',
      content: 'Python, Batch File, Java, C programming, SQL',
    },
    {
      label: 'Video Editing: ',
      content: 'Adobe Premiere Pro, Canva, Prompting, Figma',
    },
    {
      label: 'Core Skills: ',
      content: 'Problem Solving, Strategic Planning, Teamwork, Communication',
    },
  ];

  for (const skill of skillsList) {
    page.drawText(skill.label, {
      x: leftMargin,
      y: y,
      size: 9,
      font: fontBold,
      color: colorBody,
    });
    const labelWidth = fontBold.widthOfTextAtSize(skill.label, 9);
    page.drawText(skill.content, {
      x: leftMargin + labelWidth,
      y: y,
      size: 9,
      font: fontRegular,
      color: colorBody,
    });
    y -= 17;
  }

  // --- EXPERIENCE & ACTIVITIES ---
  y -= 6;
  page.drawText('EXPERIENCE & ACTIVITIES', {
    x: leftMargin,
    y: y,
    size: 11,
    font: fontBold,
    color: colorTitle,
  });

  y -= 17;
  page.drawText('AWS Cloud Club APSIT \u2014 Volunteer', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: colorTitle,
  });

  y -= 13;
  page.drawText('March 2026 \u2013 Present | Thane, Maharashtra', {
    x: leftMargin,
    y: y,
    size: 8.3,
    font: fontItalic,
    color: colorMuted,
  });

  y -= 16;
  const experienceBullets = [
    'Contribute to cloud-related initiatives and student technology activities.',
    'Support the organization of technical events and collaborative learning opportunities.',
    'Build teamwork and gain practical exposure to cloud technologies and event coordination.',
  ];

  for (const bullet of experienceBullets) {
    page.drawText('\u2022', {
      x: leftMargin + 4,
      y: y,
      size: 9,
      font: fontRegular,
      color: colorBody,
    });
    page.drawText(bullet, {
      x: leftMargin + 16,
      y: y,
      size: 8.8,
      font: fontRegular,
      color: colorBody,
    });
    y -= 16;
  }

  // --- EDUCATION ---
  y -= 7;
  page.drawText('EDUCATION', {
    x: leftMargin,
    y: y,
    size: 11,
    font: fontBold,
    color: colorTitle,
  });

  // Entry 1: APSIT
  y -= 17;
  page.drawText('A. P. Shah Institute of Technology, Thane', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: colorTitle,
  });

  y -= 13;
  page.drawText('Bachelor of Engineering (B.E.), Computer Science Engineering \u2014 AI & ML', {
    x: leftMargin,
    y: y,
    size: 9,
    font: fontRegular,
    color: colorBody,
  });

  y -= 13;
  page.drawText('September 2025 \u2013 September 2029', {
    x: leftMargin,
    y: y,
    size: 8.3,
    font: fontItalic,
    color: colorMuted,
  });

  // Entry 2: University of Mumbai
  y -= 17;
  page.drawText('University of Mumbai', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: colorTitle,
  });

  y -= 13;
  page.drawText('Bachelor of Engineering (B.E.), Computer Science', {
    x: leftMargin,
    y: y,
    size: 9,
    font: fontRegular,
    color: colorBody,
  });

  y -= 13;
  page.drawText('September 2025 \u2013 September 2029', {
    x: leftMargin,
    y: y,
    size: 8.3,
    font: fontItalic,
    color: colorMuted,
  });

  // Entry 3: MSBSHSE
  y -= 17;
  page.drawText('Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: colorTitle,
  });

  y -= 13;
  page.drawText('June 2023 \u2013 June 2025', {
    x: leftMargin,
    y: y,
    size: 8.3,
    font: fontItalic,
    color: colorMuted,
  });

  // Bottom divider & note
  y -= 20;
  page.drawLine({
    start: { x: leftMargin, y: y },
    end: { x: rightMargin, y: y },
    thickness: 0.7,
    color: colorLine,
  });

  y -= 14;
  page.drawText('Profile updated to focus on web development, video editing, education, and technology volunteering.', {
    x: leftMargin,
    y: y,
    size: 7.5,
    font: fontRegular,
    color: colorMuted,
  });

  const pdfBytes = await doc.save();
  
  const destPath1 = path.join(__dirname, '..', 'public', 'Abhishek_Mule_Resume.pdf');
  const destPath2 = path.join(__dirname, '..', 'public', 'resume-placeholder.pdf');
  fs.writeFileSync(destPath1, pdfBytes);
  fs.writeFileSync(destPath2, pdfBytes);
  console.log('Successfully generated resume PDFs at:', destPath1, 'and', destPath2);
}

generateResumePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
