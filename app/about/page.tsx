import type { Metadata } from "next";

//на странице about, будет в заголовке сайта другая надпись
export const metadata: Metadata = {
  title: "Страница про нас",
  description: "Страница про нас",
  keywords: '',
};

export default function About() {
  return (
    <div>
        <h1>About страница</h1>
        <p>Текст не о чем</p>
    </div>
  );
}

