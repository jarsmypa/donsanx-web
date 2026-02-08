import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// IMPORTANTE: Una vez que crees el proyecto en la términal,
// reemplaza estos valores con los que te de Sanity.
export const client = createClient({
    projectId: 'kexbt74e',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
};
