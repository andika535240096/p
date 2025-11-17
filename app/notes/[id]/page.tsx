'use client';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { Note } from '@/types/note'; 

const NOTES_STORAGE_KEY = 'my-nextjs-notes';

export default function NoteDetailPage() {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editError, setEditError] = useState<string | null>(null);

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const pathId = pathSegments[pathSegments.length - 1]; 
    setId(pathId); 

    if (pathId) {
      try {
        const items = localStorage.getItem(NOTES_STORAGE_KEY);
        if (items) {
          const notes: Note[] = JSON.parse(items);
          const foundNote = notes.find(n => n.id === pathId); 
          if (foundNote) {
            setNote(foundNote);
            setEditedTitle(foundNote.title);
            setEditedContent(foundNote.content);
          } else {
            setError(true); 
          }
        } else {
          setError(true); 
        }
      } catch (e) {
        console.error("Gagal memuat catatan:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setError(true); 
      setLoading(false);
    }
  }, []); 

  const handleEditToggle = () => {
    setIsEditing(true);
    setEditError(null); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (note) {
      setEditedTitle(note.title);
      setEditedContent(note.content);
    }
  };

  const handleSave = () => {
    if (!id || !note) return;

    if (!editedTitle.trim() || !editedContent.trim()) {
      setEditError("Judul dan Konten tidak boleh kosong!");
      return;
    }

    try {
      const items = localStorage.getItem(NOTES_STORAGE_KEY);
      const notes: Note[] = items ? JSON.parse(items) : [];

      const updatedNotes = notes.map(n => 
        n.id === id 
          ? { ...n, title: editedTitle, content: editedContent } 
          : n
      );

      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updatedNotes));

      setNote({ ...note, title: editedTitle, content: editedContent });

      setIsEditing(false);
      setEditError(null);

    } catch (e) {
      console.error("Gagal menyimpan perubahan:", e);
      setEditError("Gagal menyimpan perubahan. Silakan coba lagi.");
    }
  };


  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error || !note) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error: Catatan Tidak Ditemukan</Alert.Heading>
          <p>
            Catatan yang Anda cari tidak ada atau mungkin telah dihapus.
          </p>
          <hr />
          <Button as="a" href="/notes" variant="danger">
            <i className="bi bi-arrow-left me-2"></i>Kembali ke Daftar Catatan
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg">
            <Card.Header>
              <Row className="align-items-center">
                <Col>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="fs-2" 
                    />
                  ) : (
                    <Card.Title as="h2" className="mb-0">{note.title}</Card.Title>
                  )}
                </Col>
                <Col xs="auto">
                  {isEditing ? (
                    <>
                      <Button variant="secondary" onClick={handleCancel} className="me-2">
                        <i className="bi bi-x-lg me-2"></i>Batal
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        <i className="bi bi-check-lg me-2"></i>Simpan
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button as="a" href="/notes" variant="outline-secondary" className="me-2">
                        <i className="bi bi-arrow-left me-2"></i>Kembali ke Daftar
                      </Button>
                      <Button variant="primary" onClick={handleEditToggle}>
                        <i className="bi bi-pencil me-2"></i>Edit
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {editError && (
                <Alert variant="danger" onClose={() => setEditError(null)} dismissible>
                  {editError}
                </Alert>
              )}

              {isEditing ? (
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <>
                  <Card.Subtitle className="mb-3 text-muted">
                    Dibuat pada: {new Date(note.createdAt).toLocaleString()}
                  </Card.Subtitle>
                  <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {note.content}
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}