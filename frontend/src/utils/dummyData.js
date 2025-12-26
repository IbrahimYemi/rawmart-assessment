export const testUser = {
    id: "new-user",
    name: "John Doe",
    email: "j@doe.com",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
    joined_at: "Joined Dec 2023",
    created_at: "2025-11-21T13:53:01.000000Z",
    articles: 12,
    comments: 46,
};

export const DUMMY_POSTS = [
    {
        id: 1,
        title: "The Future of React 19",
        content: "Exploring the new compiler and actions API in the upcoming release...",
        tags: ["react", "frontend", "webdev"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        user: { id: "new-user", name: "John Doe" },
        comments: [
            { id: 101, time: "3minute ago", user_id: testUser?.id || "new-user", text: "Great insights!", user: testUser }
        ]
    },
    {
        id: 2,
        title: "Laravel 11 Refined",
        content: "The streamlined directory structure is a game changer for DX.",
        tags: ["laravel", "php", "backend"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        user: { id: 'ffs4344safdsdf', name: "Jane Smith" },
        comments: []
    },
    {
        id: 21,
        title: "AI Ethics in 2025",
        content: "The streamlined directory structure is a game changer for DX. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis minima quos provident dolores laboriosam ab corporis quaerat dolor debitis optio dolorum maxime, repellat doloribus ipsum qui odio adipisci alias quidem ducimus incidunt consectetur minus modi cumque. Voluptates ipsa necessitatibus perferendis unde. Et fugiat, rerum modi dolores accusamus reiciendis nostrum facere illo consequuntur ipsum error quos unde asperiores dolorem. Itaque optio magni et dicta deleniti? Nesciunt mollitia necessitatibus sapiente, eius inventore odio. Possimus fugit sint placeat quam velit quaerat, labore architecto! Vitae magnam soluta eos. Magni autem sunt ipsa tempora incidunt ratione saepe quia aspernatur minima perspiciatis, quod debitis, unde vitae expedita alias eum reprehenderit animi doloremque ullam veniam dolorum vero ipsam. Corrupti voluptate dolore, doloribus ab veniam labore? Ducimus, pariatur? Culpa perferendis, magni minus magnam laborum beatae, commodi adipisci reiciendis veniam velit atque ducimus eum. Et, ut iste illum necessitatibus maiores corrupti facilis libero alias quos nisi earum neque quibusdam hic, ipsam maxime debitis, nemo cupiditate animi quam! Ipsa deleniti nisi aliquid impedit, tenetur ab rem ipsam sint pariatur quia magnam perspiciatis natus doloribus ullam! Atque, dolor quae natus, numquam reprehenderit delectus sed dignissimos mollitia fuga cupiditate ut nobis modi sint rerum pariatur repudiandae, commodi deserunt doloremque molestiae eligendi ab similique eos. Ab suscipit voluptate aspernatur dignissimos voluptatibus molestias accusamus aperiam iusto distinctio pariatur excepturi quis eius quia, provident eligendi incidunt expedita! Eos quod repellat aut, reprehenderit tempora officiis eum eligendi, nulla, provident quos ut iste impedit doloremque rem? Eos eveniet soluta repudiandae quis ullam minima similique iusto cum atque, explicabo aliquam esse reprehenderit obcaecati quae reiciendis exercitationem! Unde natus velit labore voluptatum cum a vero provident quae sed voluptas, ducimus sapiente, quam modi nisi nemo eos ut, ab architecto! Magnam consequuntur sed facere eaque dicta amet nisi consectetur id nostrum ipsa! Sint inventore tempore officiis deleniti reprehenderit earum ratione dolores, asperiores repellendus qui laborum, exercitationem optio, temporibus rem. Quas totam aliquid dignissimos modi. Nihil quod nobis sit, eveniet natus, obcaecati exercitationem labore consectetur in magnam architecto adipisci doloremque nesciunt tempora quisquam fuga maiores! Sunt architecto sapiente eius accusantium ipsa assumenda praesentium libero odit error rem, quia accusamus laborum mollitia. Commodi eligendi repellendus, quaerat voluptates voluptatem quas odit dolor vitae minima iusto. Iusto voluptas nemo totam. Laudantium, non ullam obcaecati sit cum totam, cumque accusamus doloribus dicta deleniti fuga recusandae rem nostrum sequi. Assumenda a nobis vero veniam consequuntur saepe dolor cum sapiente nulla possimus molestias, ullam corrupti officiis. Enim iste nisi quos! Ab ipsa dolore mollitia totam, optio sit at. Incidunt dolores distinctio, in iste quis repellat architecto aut libero ducimus repellendus ex aliquam dolor provident pariatur. Similique possimus optio, ea dolorum enim delectus quas sed impedit quos, rerum voluptates beatae necessitatibus ut, incidunt cum quod? Autem, ea fuga neque cupiditate facere mollitia quisquam odit asperiores maxime at veniam in eius repellendus dicta expedita doloribus unde harum non error blanditiis eum ullam magni. Architecto laborum soluta necessitatibus fugit illum, cum quis cumque, distinctio provident sit aperiam mollitia officia error neque molestias dignissimos, eum nulla corporis enim quibusdam itaque.",
        tags: ["laravel", "php", "backend"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        user: { id: 'ffs4344fdsgdsdf', name: "Jane Smith" },
        comments: []
    },
    {
        id: 3,
        title: "Next.js 15 Performance Boosts",
        content: "Incremental adoption of server actions makes apps faster.",
        tags: ["nextjs", "react", "ssr"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        user: { id: 'ffs4344frwdsdf', name: "Michael Lee" },
        comments: [{ id: 102, time: "3minute ago", text: "Can't wait to try this!", user: { name: "Tom" } }]
    },
    {
        id: 4,
        title: "Deno vs Node in 2025",
        content: "Comparing runtime performance, ecosystem maturity, and developer experience.",
        tags: ["deno", "nodejs", "javascript"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        user: { id: 'ffs43dd44fdsdf', name: "Sarah Connor" },
        comments: []
    },
    {
        id: 5,
        title: "AI in Web Development",
        content: "How Copilot tools are reshaping frontend workflows.",
        tags: ["ai", "frontend", "copilot"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        user: { id: 'ffs4344fffdsdf', name: "Ibrahim Musa" },
        comments: [{ id: 103, time: "3minute ago", text: "This is the future!", user: { name: "Fatima" } }]
    },
    {
        id: 6,
        title: "Rust for Backend APIs",
        content: "Exploring Actix and Axum frameworks for high-performance services.",
        tags: ["rust", "backend", "api"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
        user: { id: 'ffs4344fdddsdf', name: "David Kim" },
        comments: []
    },
    {
        id: 7,
        title: "Vue 4 Sneak Peek",
        content: "Composition API refinements and better TypeScript support.",
        tags: ["vue", "typescript", "frontend"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
        user: { id: 'ffs43sad44fdsdf', name: "Maria Lopez" },
        comments: [{ id: 104, time: "3minute ago", text: "Vue keeps getting better!", user: { name: "Chris" } }]
    },
    {
        id: 8,
        title: "GraphQL Federation Explained",
        content: "Scaling GraphQL across microservices with Apollo Federation.",
        tags: ["graphql", "microservices", "api"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
        user: { id: 'ffs4344asfdsdf', name: "Ahmed Khan" },
        comments: []
    },
    {
        id: 9,
        title: "Kubernetes Simplified",
        content: "New dashboard tools make cluster management easier.",
        tags: ["kubernetes", "devops", "cloud"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString(),
        user: { id: 'ffs4344fdfdsdf', name: "Emily Zhang" },
        comments: [{ id: 105, time: "3minute ago", text: "This will save so much time!", user: { name: "Leo" } }]
    },
    {
        id: 10,
        title: "Python 3.14 Features",
        content: "Pattern matching improvements and faster async IO.",
        tags: ["python", "backend", "async"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 216).toISOString(),
        user: { id: 'ffs43asd44fdsdf', name: "Robert Brown" },
        comments: []
    },
    {
        id: 11,
        title: "SvelteKit 2.0",
        content: "Zero-config SSR and better routing APIs.",
        tags: ["svelte", "frontend", "ssr"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString(),
        user: { id: 'ffs4344ffdsdsdf', name: "Anna White" },
        comments: [{ id: 106, time: "3minute ago", text: "Svelte is underrated!", user: { name: "Nina" } }]
    },
    {
        id: 12,
        title: "Go 1.23 Networking Updates",
        content: "Improved HTTP/3 support and faster goroutines.",
        tags: ["golang", "backend", "networking"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 264).toISOString(),
        user: { id: 'ffs4344dfdfdsdf', name: "James Wilson" },
        comments: []
    },
    {
        id: 13,
        title: "PostgreSQL 17",
        content: "Better JSON indexing and parallel queries.",
        tags: ["postgresql", "database", "backend"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 288).toISOString(),
        user: { id: 'ffs4344fdfdsdf', name: "Sophia Turner" },
        comments: [{ id: 107, time: "3minute ago", text: "Databases keep evolving!", user: { name: "Mark" } }]
    },
    {
        id: 14,
        title: "Docker Compose v3",
        content: "Simplified syntax and native secrets management.",
        tags: ["docker", "devops", "containers"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 312).toISOString(),
        user: { id: 'ffs4344fsdfdsdf', name: "Daniel Evans" },
        comments: []
    },
    {
        id: 15,
        title: "AI-Powered Testing",
        content: "Tools that auto-generate unit tests with ML.",
        tags: ["ai", "testing", "automation"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 336).toISOString(),
        user: { id: 'ffs4344fsfgddsdf', name: "Olivia Green" },
        comments: [{ id: 108, time: "3minute ago", text: "This will help QA teams!", user: { name: "Sam" } }]
    },
    {
        id: 16,
        title: "WebAssembly in Production",
        content: "Real-world use cases for Wasm beyond the browser.",
        tags: ["wasm", "performance", "backend"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 360).toISOString(),
        user: { id: 'ffs4344fasdsdf', name: "Henry Adams" },
        comments: []
    },
    {
        id: 17,
        title: "Astro Framework Growth",
        content: "Static-first sites with islands architecture.",
        tags: ["astro", "frontend", "ssg"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 384).toISOString(),
        user: { id: 'ffs4344fdqwqsdf', name: "Grace Miller" },
        comments: [{ id: 109, time: "3minute ago", text: "Astro is so fast!", user: { name: "Paul" } }]
    },
    {
        id: 18,
        title: "Machine Learning with PyTorch 3",
        content: "New distributed training APIs for large models.",
        tags: ["pytorch", "ml", "ai"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 408).toISOString(),
        user: { id: 'ffs4344fddfssdf', name: "Kevin Scott" },
        comments: []
    },
    {
        id: 19,
        title: "Blockchain Beyond Crypto",
        content: "Enterprise adoption for supply chain transparency.",
        tags: ["blockchain", "enterprise", "tech"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 432).toISOString(),
        user: { id: 'ffs4344fsddsdf', name: "Laura Chen" },
        comments: [{ id: 110, time: "3minute ago", text: "Interesting applications!", user: { name: "Victor" } }]
    },
    {
        id: 20,
        title: "Tailwind CSS Tricks",
        content: "Advanced utility patterns for responsive design.",
        tags: ["tailwindcss", "css", "frontend"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 456).toISOString(),
        user: { id: 'ffs4344fsdfddsdf', name: "Emma Davis" },
        comments: []
    }
];
