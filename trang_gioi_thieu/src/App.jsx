import React, { useState } from 'react';

const projects = [
  'Trợ lý chatbot PTIT',
  'AMA Ultimate System - Tủ thuốc gia đình thông minh',
  'Trợ lý cá nhân Jarvis AI',
  'Hệ thống tiền xử lý dữ liệu lai (Hybrid Parser) nhằm tối ưu hóa GraphRAG trong truy vấn văn bản quy chuẩn pháp lý Việt Nam',
];

const backgroundColors = [
  '#ffffff',
  '#dff7ff',
  '#ffe4ec',
  '#ffd6d6',
  '#fff5cc',
  '#f0e6ff',
  '#f2e1d7',
];

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Header({ greeting, onChangeBackground }) {
  return (
    <header>
      <h1>Trang giới thiệu bản thân</h1>
      <p className="greeting">{greeting}</p>
      <button className="background-button" onClick={onChangeBackground} type="button">
        Đổi màu nền
      </button>
    </header>
  );
}

function About() {
  return (
    <Section title="Giới thiệu">
      <p>Xin chào! Tôi là Nguyễn Bình Minh, sinh viên năm 2 ngành Trí tuệ nhân tạo vạn vật (AIoT) tại Học viện Công nghệ Bưu chính Viễn thông.</p>
      <p>Mã sinh viên: B25DCTV054</p>
      <p>Lớp hành chính: D25CQTV02-B</p>
    </Section>
  );
}

function Hobbies() {
  const hobbies = ['Chơi game', 'Nghe nhạc', 'Xem phim', 'Đi ngủ'];

  return (
    <Section title="Sở thích">
      <ul>
        {hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
      </ul>
    </Section>
  );
}

function Projects({ projectList }) {
  return (
    <Section title="Dự án cá nhân">
      <table className="projects-table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên dự án</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((project, index) => (
            <tr key={project}>
              <td>{index + 1}</td>
              <td>{project}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function Contact() {
  return (
    <Section title="Liên hệ">
      <p>Số điện thoại: 0376337563</p>
      <p>Email: Minhnb.b25tv054@stu.ptit.edu.vn</p>
    </Section>
  );
}

function Footer() {
  return <footer><p>© 2026 - Trang cá nhân của Bình Minh</p></footer>;
}

function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Chào buổi sáng! Chúc bạn một ngày mới tốt lành.';
  }

  if (currentHour < 18) {
    return 'Chào buổi chiều! Chúc bạn một buổi chiều vui vẻ.';
  }

  return 'Chào buổi tối! Bạn đi ngủ được rồi. Bye bạn!';
}

export default function App() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  function changeBackground() {
    setBackgroundIndex((currentIndex) => (currentIndex + 1) % backgroundColors.length);
  }

  return (
    <>
      <div
        className="page-background"
        style={{ backgroundColor: backgroundColors[backgroundIndex] }}
      >
        <div className="container">
          <Header greeting={getGreeting()} onChangeBackground={changeBackground} />
          <main>
            <About />
            <Hobbies />
            <Projects projectList={projects} />
            <Contact />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
