export const prismaSchema = `
## Thoughtleader
* name
* jobDescription
* category

## Article
* title
* authors
* date
* duration
* category
* topics

## Book
* title
* authors
* publisher
* isbn
* note
* category
* topics

## Podcast
* title
* hosts
* category
* topics
* podcastEpisodes

## Podcast Episode
* title
* podcast
* guests
* date
* duration
* category
* topics

## Directory
* name
* description
* category
* topics

## Video
* title
* creators
* date
* duration
* category
* topics

## Tool
* name
* description
* category
* topics

## Community
* name
* description
* category
* topics

## Course
* name
* description
* category
* topics

## Example
* name
* description
* category
* topics

## Agency
* name
* description
* category
* topics

## Slide
* title
* authors
* date
* category
* topics

## Magazine
* name
* description
* category
* topics

## Newsletter
* name
* authors
* description
* frequency
* category
* topics

## Paper
* title
* authors
* date
* journal
* category
* topics

## Social Media Profile
* name
* handle
* description
* category
* topics

## Report
* title
* authors
* date
* description
* category
* topics
`;
