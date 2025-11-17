'use client';

import { Modal, Button } from 'react-bootstrap';


interface DeleteConfirmationProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  noteTitle: string;
}

function DeleteConfirmation({ show, onHide, onConfirm, noteTitle }: DeleteConfirmationProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
          Konfirmasi Hapus
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Apakah Anda yakin ingin menghapus catatan ini?</p>
        <p className="text-muted">
          Judul: <strong>{noteTitle}</strong>
        </p>
        <p>Tindakan ini tidak dapat dibatalkan.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <i className="bi bi-trash me-2"></i>Ya, Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;