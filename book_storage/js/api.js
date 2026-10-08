const API_URL = 'https://6ac6f40ebea0e72cf5c9519b.mockapi.io/api/v1/books';

export async function getBooks() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Không thể tải danh sách sách.');
  }

  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error('Không thể xóa sách trên server.');
  }

  return res.json();
}

export async function addBook(bookData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    throw new Error('Không thể thêm sách mới vào server.');
  }

  return res.json();
}
