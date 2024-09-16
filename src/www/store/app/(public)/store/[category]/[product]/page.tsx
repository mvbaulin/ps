import { getTitle } from '@/lib/prisma';

export default async function Page(
  { params: { product } }:
  { params: { product: string } }) {

  const data = await getTitle(product);

  return (
    <main>

    </main>
  );
}
