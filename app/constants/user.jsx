
export const users = [
    {
        id: 1,
        photo: 'img/user/03.jpg',
        name: 'Alisa Smith',
        position: 'Assistant',
        company: 'Company Inc.',
        about: `Professinal with perfect verbal skills.`
    }
];

const userImages = [
    {width: 900, height: 500, alt: "User 1", src: "img/user/01.jpg"},
    {width: 900, height: 500, alt: "User 2", src: "img/user/02.jpg"},
    {width: 900, height: 500, alt: "User 3", src: "img/user/03.jpg"},
    {width: 900, height: 500, alt: "User 4", src: "img/user/04.jpg"},
    {width: 900, height: 500, alt: "User 5", src: "img/user/05.jpg"},
    {width: 900, height: 500, alt: "User 6", src: "img/user/06.jpg"},
    {width: 900, height: 500, alt: "User 7", src: "img/user/07.jpg"},
]

export const initialState = {
    users,
    userImages,
    nextId: 3,
    openUser: null,
    editingUser: null,
    editingProp: null,
    isNew: false,
    searchQuery: null
};