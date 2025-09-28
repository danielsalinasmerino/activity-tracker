# Activity Tracker

A responsive web application for tracking daily activities and building healthy habits. Built with React, TypeScript, and CSS Modules.

## Features

- **Daily Activity Tracking**: Mark activities as complete/incomplete for each day
- **Custom Activities**: Add your own activities with descriptions and frequency settings
- **Progress Notes**: Add optional notes when completing activities
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: See your daily completion count update instantly
- **Clean Interface**: Modern, intuitive design with smooth interactions

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS Modules for component-scoped styling
- **State Management**: React Context + useReducer
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Code Quality**: ESLint with Airbnb configuration

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/danielsalinasmerino/activity-tracker.git
cd activity-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/           # Reusable UI components
├── hooks/               # Custom React hooks
├── stores/              # State management
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Main application component
├── App.module.css       # CSS modules for styling
└── main.tsx             # Application entry point
```

## Usage

### Adding Activities

1. Click the "Add New Activity" button
2. Enter activity name and description
3. Select frequency (daily/weekly)
4. Click "Add Activity"

### Tracking Progress

1. Click "Mark Complete" on any activity card
2. Optionally add notes about your progress
3. View your daily completion count in the header
4. Click "Completed" to unmark if needed

### Managing Activities

- Use the delete button (🗑️) to remove activities
- Use the notes button (📝) to add completion notes

## Customization

The application uses CSS Modules for styling. You can customize the appearance by modifying the styles in `src/App.module.css`. The design is fully responsive and includes:

- Mobile-first responsive breakpoints
- CSS Grid layout for activity cards
- Smooth transitions and hover effects
- Modern gradient backgrounds

## Future Enhancements

- [ ] Data persistence with local storage or backend
- [ ] Weekly/monthly progress views
- [ ] Habit streaks and statistics
- [ ] Activity categories and filtering
- [ ] Export progress data
- [ ] Dark mode theme
- [ ] PWA support with offline functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Daniel Salinas Merino**

- GitHub: [@danielsalinasmerino](https://github.com/danielsalinasmerino)

---

Built with ❤️ for better habit tracking
