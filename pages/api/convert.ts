// File: app/api/convert/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    console.log("Here");
    // 1. Validate the file
    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF.' }, { status: 400 });
    }

    // --- REAL CONVERSION LOGIC WOULD GO HERE ---
    // In a real app, you would use a library like `pdf-lib` and `docx`
    // or call a third-party API (e.g., Adobe API, CloudConvert).
    // For this example, we'll simulate the process.

    console.log(`Simulating conversion for: ${file.name}`);

    // 2. Simulate a delay for conversion
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Create a dummy Word document to send back
    const dummyDocxContent = "This is a dummy DOCX file converted from your PDF.";
    const blob = new Blob([dummyDocxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    // 4. Create response headers to trigger download
    const headers = new Headers();
    const originalFileName = file.name.replace(/\.pdf$/i, '');
    headers.append('Content-Disposition', `attachment; filename="${originalFileName}.docx"`);
    headers.append('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    console.log('Simulation complete. Sending back the file.');

    return new NextResponse(blob, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Conversion API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred during conversion.' }, { status: 500 });
  }
}