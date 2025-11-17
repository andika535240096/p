'use client';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card bg="secondary" text="white" className="shadow-lg">
            <Card.Header as="h2" className="text-center">Informasi Project</Card.Header>
            <Card.Body>
              <Card.Title as="h4">Data Mahasiswa</Card.Title>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item bg-secondary text-white">
                  <strong>Nama:</strong> Andika Halim
                </li>
                <li className="list-group-item bg-secondary text-white">
                  <strong>NIM:</strong> 535240096
                </li>
              </ul>
              <p>
                <strong>Aplikasi Catatan Sederhana (Simple Note App) Untuk Kamu!</strong>
              </p>
              <p>
                Kamu bisa nulis apa aja tentang diri kamu atau pekerjaan kamu ataupun menjadi catatan kalau kamu sedang di sekolah atau kampus, gausah takut ini gabakal di upload kemana mana hanya di laptop kamu saja jadi tenang aja ya, Semangat!!!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}