export const prismaSchema = `
| Category | Fields |
| --- | --- |
| **Thoughtleader** | name, jobDescription |
| **Article** | title, authors, date, duration, topics |
| **Book** | title, authors, publisher, isbn, topics |
| **Podcast** | title, hosts, topics, podcastEpisodes |
| **Podcast Episode** | title, podcast, guests, date, duration, topics |
| **Directory** | name, description, topics |
| **Video** | title, creators, date, duration, topics |
| **Tool** | name, description, topics |
| **Community** | name, description, topics |
| **Course** | name, description, topics |
| **Example** | name, description, topics |
| **Agency** | name, description, topics |
| **Slide** | title, authors, date, topics |
| **Magazine** | name, description, topics |
| **Newsletter** | name, authors, description, frequency, topics |
| **Paper** | title, authors, date, journal, topics |
| **Social Media Profile** | name, handle, description, topics |
| **Report** | title, authors, date, description, topics |
`;
