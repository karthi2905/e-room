# E-Room - Video Conferencing Application

A modern, feature-rich video conferencing application built with Next.js 15, Stream.io, and Clerk authentication.

## 🚀 Features

- **Instant Meetings**: Start a meeting instantly with a single click
- **Schedule Meetings**: Plan meetings ahead with date/time picker
- **Join Meetings**: Join meetings via invitation link
- **Personal Room**: Your own permanent meeting room
- **Meeting History**: View previous meetings
- **Upcoming Meetings**: See all scheduled meetings
- **Recordings**: Access and playback recorded meetings
- **Video Layouts**: Switch between grid, speaker-left, and speaker-right layouts
- **Meeting Controls**: Full control over camera, microphone, screen sharing
- **Participant Management**: View and manage meeting participants
- **Secure Authentication**: Powered by Clerk

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (with Turbopack)
- **Video SDK**: Stream.io Video React SDK
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Language**: TypeScript

## 📋 Prerequisites

Before running this project, you need:

1. **Node.js** (v18 or higher)
2. **Clerk Account** - Get your API keys from [clerk.com](https://clerk.com)
3. **Stream.io Account** - Get your API keys from [getstream.io](https://getstream.io)

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream.io Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd e-room
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Clerk and Stream.io API keys

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
e-room/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (rout)/          # Main application routes
│   │   ├── (home)/      # Home and meeting pages
│   │   └── meeting/     # Meeting room
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/             # UI components (shadcn/ui)
│   ├── CallList.tsx    # Meeting list component
│   ├── MeetingCard.tsx # Meeting card component
│   ├── MeetingRoom.tsx # Video call interface
│   └── ...
├── hooks/              # Custom React hooks
├── actions/            # Server actions
├── constants/          # Constants and config
├── providers/          # Context providers
└── public/             # Static assets
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔑 Key Features Explained

### Meeting Types

1. **Instant Meeting**: Creates and joins a meeting immediately
2. **Scheduled Meeting**: Set date, time, and description for future meetings
3. **Personal Room**: A permanent room with your user ID as the meeting ID

### Video Controls

- Camera on/off
- Microphone mute/unmute
- Screen sharing
- Layout switching (Grid, Speaker-left, Speaker-right)
- Participant list
- Call statistics
- End call (for meeting owner)

## 🔒 Security

- All routes are protected with Clerk middleware
- Meeting access is controlled by Stream.io
- Environment variables are gitignored
- Secure token generation for video calls

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the repository.

---

Built with ❤️ using Next.js and Stream.io
