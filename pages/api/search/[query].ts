import { getSearch } from '../../../lib/notion';

export default async function handler(req, res) {
  const query = req.query.query;

  const searchResults = await getSearch(query);

  res.status(200).json(searchResults);
}
