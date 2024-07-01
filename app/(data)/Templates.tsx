import { faPenNib, faFileAlt, faLightbulb, faVideo, faUtensils, faDumbbell, faPlane, faBriefcase, faCalendar, faMoneyBillWave, faLanguage, faCamera, faPray, faMicrophone, faHome, faSeedling, faComment, faTags, faEnvelope, faShoppingCart, faBullhorn, faGlobe, faBook, faCode, faChartBar, faMusic, faPalette } from '@fortawesome/free-solid-svg-icons';

const templates = [
    {
        name: 'Blog Title',
        desc: 'An AI tool that generates blog title depends on your blog info',
        category: 'Blog',
        icon: faPenNib,
        aiPrompt: 'Give me 5 blog topic ideas in bullets based on the given niche & outline and give me result in Rich text editor format',
        slug: 'generate-blog-title',
        premium: false,
        form: [
            { label: 'Enter your blog niche', field: 'input', name: 'niche', required: true },
            { label: 'Enter blog outline', field: 'textarea', name: 'outline' }
        ]
    },

    {
        name: 'Blog Content',
        desc: 'An AI tool that generates complete blog content based on your blog info',
        category: 'Blog',
        icon: faFileAlt,
        aiPrompt: 'Generate a detailed blog post based on the given niche and outline. The content should be engaging and informative, formatted in Rich text editor format.',
        slug: 'generate-blog-content',
        premium: false,
        form: [
            { label: 'Enter your blog niche', field: 'input', name: 'niche', required: true },
            { label: 'Enter blog outline', field: 'textarea', name: 'outline' }
        ]
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'An AI tool that generates blog topic ideas based on your niche',
        category: 'Blog',
        icon: faLightbulb,
        aiPrompt: 'Give me 5 blog topic ideas in bullets based on the given niche, and provide the result in Rich text editor format.',
        slug: 'generate-blog-topic-ideas',
        premium: false,
        form: [
            { label: 'Enter your blog niche', field: 'input', name: 'niche', required: true }
        ]
    },
    {
        name: 'YouTube SEO Title',
        desc: 'An AI tool that generates SEO-optimized titles for YouTube videos',
        category: 'YouTube',
        icon: faVideo,
        aiPrompt: 'Generate 5 SEO-optimized YouTube titles based on the given video topic and keywords. The titles should be catchy and relevant.',
        slug: 'generate-youtube-seo-title',
        premium: false,
        form: [
            { label: 'Enter your video topic', field: 'input', name: 'topic', required: true },
            { label: 'Enter keywords', field: 'input', name: 'keywords' }
        ]
    },
    {
        name: 'YouTube Description',
        desc: 'An AI tool that generates detailed descriptions for YouTube videos',
        category: 'YouTube',
        icon: faComment,
        aiPrompt: 'Generate a detailed YouTube video description based on the given video topic and keywords. The description should be informative and include relevant keywords for SEO.',
        slug: 'generate-youtube-description',
        premium: false,
        form: [
            { label: 'Enter your video topic', field: 'input', name: 'topic', required: true },
            { label: 'Enter keywords', field: 'input', name: 'keywords' }
        ]
    },
    {
        name: 'YouTube Tags',
        desc: 'An AI tool that generates relevant tags for YouTube videos',
        category: 'YouTube',
        icon: faTags,
        aiPrompt: 'Generate 10 relevant tags for a YouTube video based on the given topic and keywords. The tags should be highly relevant to the content for better discoverability.',
        slug: 'generate-youtube-tags',
        premium: false,
        form: [
            { label: 'Enter your video topic', field: 'input', name: 'topic', required: true },
            { label: 'Enter keywords', field: 'input', name: 'keywords' }
        ]
    },
    {
        name: 'Social Media Post',
        desc: 'An AI tool that generates engaging social media posts based on the given topic',
        category: 'Social Media',
        icon: faComment,
        aiPrompt: 'Generate an engaging social media post based on the given topic and keywords. The post should be attention-grabbing and suitable for platforms like Facebook, Twitter, and Instagram.',
        slug: 'generate-social-media-post',
        premium: true,
        form: [
            { label: 'Enter your topic', field: 'input', name: 'topic', required: true },
            { label: 'Enter keywords', field: 'input', name: 'keywords' }
        ]
    },
    {
        name: 'Product Description',
        desc: 'An AI tool that generates detailed product descriptions for e-commerce',
        category: 'E-commerce',
        icon: faShoppingCart,
        aiPrompt: 'Generate a detailed product description based on the given product name and features. The description should be informative and persuasive, formatted in Rich text editor format.',
        slug: 'generate-product-description',
        premium: true,
        form: [
            { label: 'Enter your product name', field: 'input', name: 'productName', required: true },
            { label: 'Enter product features', field: 'textarea', name: 'features' }
        ]
    },
    {
        name: 'Email Newsletter',
        desc: 'An AI tool that generates email newsletters based on the given topic',
        category: 'Email',
        icon: faEnvelope,
        aiPrompt: 'Generate an engaging email newsletter based on the given topic and keywords. The newsletter should be informative and formatted in Rich text editor format.',
        slug: 'generate-email-newsletter',
        premium: true,
        form: [
            { label: 'Enter your topic', field: 'input', name: 'topic', required: true },
            { label: 'Enter keywords', field: 'input', name: 'keywords' }
        ]
    },
    {
        name: 'Ad Copy',
        desc: 'An AI tool that generates compelling ad copy for marketing campaigns',
        category: 'Marketing',
        icon: faBullhorn,
        aiPrompt: 'Generate compelling ad copy based on the given product and target audience. The copy should be persuasive and suitable for various advertising platforms.',
        slug: 'generate-ad-copy',
        premium: true,
        form: [
            { label: 'Enter your product', field: 'input', name: 'product', required: true },
            { label: 'Enter target audience', field: 'input', name: 'audience' }
        ]
    },
    {
        name: 'Website Headline',
        desc: 'An AI tool that generates attention-grabbing website headlines',
        category: 'Web',
        icon: faGlobe,
        aiPrompt: 'Generate 5 attention-grabbing website headlines based on the given topic and keywords. The headlines should be catchy and relevant.',
        slug: 'generate-website-headline',
        premium: true,
        form: [
            { label: 'Enter your topic', field: 'input', name: 'topic', required: true },
            { label: 'Enter keywords', field: 'input', name: 'keywords' }
        ]
    },
    // Adding more templates to make the total 30
    {
        name: 'SEO Analysis',
        desc: 'An AI tool that provides detailed SEO analysis for websites',
        category: 'SEO',
        icon: faChartBar,
        aiPrompt: 'Provide a detailed SEO analysis based on the given website URL. The analysis should include keyword optimization, meta tags, and content suggestions.',
        slug: 'generate-seo-analysis',
        premium: true,
        form: [
            { label: 'Enter website URL', field: 'input', name: 'url', required: true }
        ]
    },
    {
        name: 'Code Snippets',
        desc: 'An AI tool that generates code snippets based on user input',
        category: 'Development',
        icon: faCode,
        aiPrompt: 'Generate a code snippet based on the given programming language and requirements. The snippet should be well-commented and easy to understand.',
        slug: 'generate-code-snippets',
        premium: true,
        form: [
            { label: 'Enter programming language', field: 'input', name: 'language', required: true },
            { label: 'Enter code requirements', field: 'textarea', name: 'requirements' }
        ]
    },
    {
        name: 'Music Playlist',
        desc: 'An AI tool that generates music playlists based on user preferences',
        category: 'Music',
        icon: faMusic,
        aiPrompt: 'Generate a music playlist based on the given genre and mood. The playlist should be diverse and include both popular and lesser-known tracks.',
        slug: 'generate-music-playlist',
        premium: true,
        form: [
            { label: 'Enter genre', field: 'input', name: 'genre', required: true },
            { label: 'Enter mood', field: 'input', name: 'mood', required: true }
        ]
    },
    {
        name: 'Art Inspiration',
        desc: 'An AI tool that generates art inspiration based on user input',
        category: 'Art',
        icon: faPalette,
        aiPrompt: 'Generate art inspiration based on the given theme and medium. The inspiration should be unique and provide a starting point for artists.',
        slug: 'generate-art-inspiration',
        premium: true,
        form: [
            { label: 'Enter theme', field: 'input', name: 'theme', required: true },
            { label: 'Enter medium', field: 'input', name: 'medium', required: true }
        ]
    },
    {
        name: 'Recipe Ideas',
        desc: 'An AI tool that generates recipe ideas based on user input',
        category: 'Food',
        icon: faUtensils,
        aiPrompt: 'Generate recipe ideas based on the given ingredients and cuisine type. The recipes should be easy to follow and include a variety of options.',
        slug: 'generate-recipe-ideas',
        premium: true,
        form: [
            { label: 'Enter ingredients', field: 'textarea', name: 'ingredients', required: true },
            { label: 'Enter cuisine type', field: 'input', name: 'cuisine', required: true }
        ]
    },
    {
        name: 'Fitness Plan',
        desc: 'An AI tool that generates fitness plans based on user goals',
        category: 'Fitness',
        icon: faDumbbell,
        aiPrompt: 'Generate a fitness plan based on the given goals and preferences. The plan should include a mix of exercises and be tailored to the user\'s fitness level.',
        slug: 'generate-fitness-plan',
        premium: true,
        form: [
            { label: 'Enter fitness goals', field: 'textarea', name: 'goals', required: true },
            { label: 'Enter preferences', field: 'textarea', name: 'preferences' }
        ]
    },
    {
        name: 'Travel Itinerary',
        desc: 'An AI tool that generates travel itineraries based on user input',
        category: 'Travel',
        icon: faPlane,
        aiPrompt: 'Generate a travel itinerary based on the given destination and interests. The itinerary should include a mix of popular attractions and hidden gems.',
        slug: 'generate-travel-itinerary',
        premium: true,
        form: [
            { label: 'Enter destination', field: 'input', name: 'destination', required: true },
            { label: 'Enter interests', field: 'textarea', name: 'interests' }
        ]
    },
    {
        name: 'Book Recommendations',
        desc: 'An AI tool that generates book recommendations based on user preferences',
        category: 'Books',
        icon: faBook,
        aiPrompt: 'Generate book recommendations based on the given genre and preferences. The recommendations should include a mix of popular and lesser-known titles.',
        slug: 'generate-book-recommendations',
        premium: true,
        form: [
            { label: 'Enter genre', field: 'input', name: 'genre', required: true },
            { label: 'Enter preferences', field: 'textarea', name: 'preferences' }
        ]
    },
    {
        name: 'Job Description',
        desc: 'An AI tool that generates job descriptions based on user input',
        category: 'HR',
        icon: faBriefcase,
        aiPrompt: 'Generate a job description based on the given role and requirements. The description should be detailed and include key responsibilities and qualifications.',
        slug: 'generate-job-description',
        premium: true,
        form: [
            { label: 'Enter role', field: 'input', name: 'role', required: true },
            { label: 'Enter requirements', field: 'textarea', name: 'requirements' }
        ]
    },
    {
        name: 'Event Planning',
        desc: 'An AI tool that generates event planning ideas based on user input',
        category: 'Events',
        icon: faCalendar,
        aiPrompt: 'Generate event planning ideas based on the given type and theme. The ideas should be creative and include a variety of options.',
        slug: 'generate-event-planning-ideas',
        premium: true,
        form: [
            { label: 'Enter event type', field: 'input', name: 'eventType', required: true },
            { label: 'Enter theme', field: 'input', name: 'theme', required: true }
        ]
    },
    {
        name: 'Marketing Strategy',
        desc: 'An AI tool that generates marketing strategies based on user input',
        category: 'Marketing',
        icon: faBullhorn,
        aiPrompt: 'Generate a marketing strategy based on the given product and target audience. The strategy should be comprehensive and include a mix of online and offline tactics.',
        slug: 'generate-marketing-strategy',
        premium: true,
        form: [
            { label: 'Enter product', field: 'input', name: 'product', required: true },
            { label: 'Enter target audience', field: 'textarea', name: 'audience', required: true }
        ]
    },
    {
        name: 'Resume Builder',
        desc: 'An AI tool that generates resumes based on user input',
        category: 'Career',
        icon: faFileAlt,
        aiPrompt: 'Generate a resume based on the given personal details and work experience. The resume should be well-structured and formatted.',
        slug: 'generate-resume',
        premium: true,
        form: [
            { label: 'Enter personal details', field: 'textarea', name: 'details', required: true },
            { label: 'Enter work experience', field: 'textarea', name: 'experience', required: true }
        ]
    },
    {
        name: 'Personal Budget',
        desc: 'An AI tool that generates personal budgets based on user input',
        category: 'Finance',
        icon: faMoneyBillWave,
        aiPrompt: 'Generate a personal budget based on the given income and expenses. The budget should be detailed and include suggestions for savings.',
        slug: 'generate-personal-budget',
        premium: true,
        form: [
            { label: 'Enter income', field: 'input', name: 'income', required: true },
            { label: 'Enter expenses', field: 'textarea', name: 'expenses', required: true }
        ]
    },
    {
        name: 'Language Learning',
        desc: 'An AI tool that generates language learning plans based on user goals',
        category: 'Education',
        icon: faLanguage,
        aiPrompt: 'Generate a language learning plan based on the given goals and preferences. The plan should include a mix of exercises and resources.',
        slug: 'generate-language-learning-plan',
        premium: true,
        form: [
            { label: 'Enter language', field: 'input', name: 'language', required: true },
            { label: 'Enter goals', field: 'textarea', name: 'goals', required: true }
        ]
    },
    {
        name: 'Photography Tips',
        desc: 'An AI tool that generates photography tips based on user input',
        category: 'Photography',
        icon: faCamera,
        aiPrompt: 'Generate photography tips based on the given type of photography and camera settings. The tips should be practical and easy to follow.',
        slug: 'generate-photography-tips',
        premium: true,
        form: [
            { label: 'Enter type of photography', field: 'input', name: 'type', required: true },
            { label: 'Enter camera settings', field: 'textarea', name: 'settings' }
        ]
    },
    {
        name: 'Meditation Guide',
        desc: 'An AI tool that generates meditation guides based on user input',
        category: 'Wellness',
        icon: faPray,
        aiPrompt: 'Generate a meditation guide based on the given goals and preferences. The guide should be detailed and include a variety of techniques.',
        slug: 'generate-meditation-guide',
        premium: true,
        form: [
            { label: 'Enter goals', field: 'textarea', name: 'goals', required: true },
            { label: 'Enter preferences', field: 'textarea', name: 'preferences' }
        ]
    },
    {
        name: 'Podcast Script',
        desc: 'An AI tool that generates podcast scripts based on user input',
        category: 'Podcasting',
        icon: faMicrophone,
        aiPrompt: 'Generate a podcast script based on the given topic and format. The script should be engaging and include key points and segments.',
        slug: 'generate-podcast-script',
        premium: true,
        form: [
            { label: 'Enter topic', field: 'input', name: 'topic', required: true },
            { label: 'Enter format', field: 'textarea', name: 'format', required: true }
        ]
    },
    {
        name: 'Interior Design Ideas',
        desc: 'An AI tool that generates interior design ideas based on user input',
        category: 'Design',
        icon: faHome,
        aiPrompt: 'Generate interior design ideas based on the given room type and style. The ideas should be creative and practical.',
        slug: 'generate-interior-design-ideas',
        premium: true,
        form: [
            { label: 'Enter room type', field: 'input', name: 'roomType', required: true },
            { label: 'Enter style', field: 'textarea', name: 'style', required: true }
        ]
    },
    {
        name: 'Gardening Tips',
        desc: 'An AI tool that generates gardening tips based on user input',
        category: 'Gardening',
        icon: faSeedling,
        aiPrompt: 'Generate gardening tips based on the given plants and climate. The tips should be practical and easy to follow.',
        slug: 'generate-gardening-tips',
        premium: true,
        form: [
            { label: 'Enter plants', field: 'textarea', name: 'plants', required: true },
            { label: 'Enter climate', field: 'textarea', name: 'climate', required: true }
        ]
    },
];

export default templates;
