import { Post } from "../../app/models/post.model";

export const POSTS: Post[] = [
    {
        id: 1,
        postTitle: 'Gato Perdido',
        postType: 'Aviso',
        description: 'Gato preto, Shadow, desapareceu ontem à noite. Favor entrar em contato se encontrá-lo!',
        postDate: new Date('2025-04-25')
    },
    {
        id: 2,
        postTitle: 'Feira de Garagem Comunitária',
        postType: 'Evento',
        description: 'Participe da feira de garagem comunitária neste sábado no pátio principal.',
        postDate: new Date('2025-04-27')
    },
    {
        id: 3,
        postTitle: 'Aulas de Yoga',
        postType: 'Evento',
        description: 'Aulas gratuitas de yoga toda segunda e quarta-feira às 19h no salão comunitário.',
        postDate: new Date('2025-04-28')
    }
];
