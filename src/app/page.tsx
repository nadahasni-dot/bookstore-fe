import BookList from "@/components/book/book-list";
import Navbar from "@/components/navbar";
import TagSelector from "@/components/tag/tag-selector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <TagSelector />
      <BookList />
    </main>
  );
}
