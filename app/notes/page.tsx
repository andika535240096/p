'use client';
import { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Card, 
  ListGroup,
  Alert
} from 'react-bootstrap';
import { Note } from '@/types/note';
import DeleteConfirmation from '@/components/DeleteConfirmation'; 

const NOTES_STORAGE_KEY = 'my-nextjs-notes';
const MAX_CONTENT_LENGTH = 500;

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isClient, setIsClient] = useState(false);

  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  useEffect(() => {
    setIsClient(true);
    try {
      const items = localStorage.getItem(NOTES_STORAGE_KEY);
      if (items) {
        setNotes(JSON.parse(items));
      }
    } catch (error) {
      console.error("Gagal memuat catatan dari localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error("Gagal menyimpan catatan ke localStorage:", error);
      }
    }
  }, [notes, isClient]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorAlert(null);
    
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      setErrorAlert("Judul dan Konten tidak boleh kosong!");
      return;
    }

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: newNoteTitle,
      content: newNoteContent,
      createdAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const openDeleteModal = (note: Note) => {
    setNoteToDelete(note);
    setShowDeleteModal(true);
  };

  const confirmDeleteNote = () => {
    if (!noteToDelete) return;
    
    setNotes(notes.filter(note => note.id !== noteToDelete.id));
    // Reset state modal
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  // (3) Fungsi untuk MENUTUP modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  if (!isClient) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }


  const charsRemaining = MAX_CONTENT_LENGTH - newNoteContent.length;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm mb-4 position-sticky" style={{ top: '5rem' }}>
            <Card.Header as="h4"><i className="bi bi-pencil-square me-2"></i>Buat Catatan Baru</Card.Header>
            <Card.Body>
              {errorAlert && (
                <Alert variant="danger" onClose={() => setErrorAlert(null)} dismissible>
                  {errorAlert}
                </Alert>
              )}
              
              <Form onSubmit={handleAddNote}>
                <Form.Group className="mb-3" controlId="noteTitle">
                  <Form.Label>Judul Catatan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan judul..."
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="noteContent">
                  <Form.Label>Isi Catatan</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Masukkan isi catatan..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    maxLength={MAX_CONTENT_LENGTH}
                    required
                  />
                  <Form.Text className={charsRemaining < 0 ? 'text-danger' : 'text-muted'}>
                    Sisa karakter: {charsRemaining}
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  <i className="bi bi-plus-circle me-2"></i>Tambah Catatan
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Kolom Daftar Catatan */}
        <Col md={8}>
          <h2 className="mb-3"><i className="bi bi-collection me-2"></i>Daftar Catatan</h2>
          {notes.length === 0 ? (
            <Card className="text-center p-5 bg-light border-dashed">
              <Card.Body>
                <i className="bi bi-journal-plus" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                <h5 className="mt-3">Belum ada catatan</h5>
                <p className="text-muted">
                  Mulai buat catatan baru di formulir sebelah kiri.
                </p>
              </Card.Body>
            </Card>
          ) : (
            <ListGroup>
              {notes.map((note) => (
                <ListGroup.Item 
                  key={note.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <a href={`/notes/${note.id}`} className="card-link-trigger w-100">
                    <div>
                      <div className="fw-bold">{note.title}</div>
                      <small className="text-muted">
                        Dibuat pada: {new Date(note.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </a>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => openDeleteModal(note)}
                    title="Hapus catatan"
                    className="ms-3"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      
      <DeleteConfirmation 
        show={showDeleteModal}
        onHide={closeDeleteModal}
        onConfirm={confirmDeleteNote}
        noteTitle={noteToDelete?.title || ""}
      />
    </Container>
  );
}