export default {
    name: 'post',
    title: 'Notas',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'tag',
            title: 'Etiqueta (Ej: Reflexión, Ensayo)',
            type: 'string',
        },
        {
            name: 'publishedAt',
            title: 'Fecha de Publicación',
            type: 'datetime',
        },
        {
            name: 'mainImage',
            title: 'Imagen de Portada (Miniatura)',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'headerImage',
            title: 'Imagen de Cabecera (Detalle)',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'body',
            title: 'Cuerpo',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        },
    ],

    preview: {
        select: {
            title: 'title',
            author: 'tag',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
}
