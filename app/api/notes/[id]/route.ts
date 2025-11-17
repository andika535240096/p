import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content } = body;

    const updatedNote = await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Gagal mengupdate catatan' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      { message: 'Catatan berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Gagal menghapus catatan' },
      { status: 500 }
    );
  }
}