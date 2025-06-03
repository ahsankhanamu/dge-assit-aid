# Assist-Aid

Hey there! 👋 This is a web app I built to help people manage their assistance applications. It's designed to be super user-friendly and accessible to everyone, no matter what language they speak or what device they're using.

## What's Inside? 🛠️

I've used some pretty cool tech to build this:

### Frontend Stuff

- **React** - Because it's awesome for building UIs
- **TypeScript** - To catch those pesky bugs before they happen
- **Tailwind CSS** - Makes styling a breeze
- **shadcn/ui** - Beautiful, accessible components out of the box
- **React Hook Form** - Handles all the form stuff (and there's a lot of it!)
- **i18next** - Makes the app speak multiple languages
- **React Router** - For smooth navigation between pages

### Backend Integration

- **API Client** - Built this to handle all the API calls with:
  - Smart retries when things go wrong
  - Timeout handling (because waiting forever is no fun)
  - Proper error messages (no more cryptic errors!)
  - Type safety (TypeScript is friend)
- **OpenAI Integration** - Helps users write better applications
- **Email Service** - Keeps users in the loop about their application status

## Features 🌟

### 1. Step-by-Step Form

- Easy navigation between steps
- Shows your progress
- Saves your work automatically
- Validates each step
- Go back and fix stuff if you need to

### 2. AI Writing Assistant

- Gets context from your previous answers
- Gives relevant suggestions
- Generates content in real-time
- Let's you tweak the suggestions
- Accept or try again if you don't like it

### 3. Accessibility First

- Works with screen readers
- Keyboard navigation friendly
- High contrast mode
- Clear focus indicators
- Proper ARIA labels

### 4. Speaks Your Language

- Multiple language support
- Right-to-left language support
- Translates everything (even error messages)
- Proper date and number formatting

### 5. Looks Great Everywhere

- Works on all screen sizes
- Dark mode (because dark mode is life)
- Smooth animations
- Clear loading states
- Helpful error messages
- Toast notifications (the good kind)

## Why These Tech Choices? 🤔

### React + TypeScript

I chose these because:

- TypeScript catches bugs before they happen
- Better developer experience (less guessing)
- Easier to refactor (we all know code changes)
- Great IDE support
- Code documents itself

### Tailwind CSS

Because:

- Super fast to style things
- Consistent look and feel
- Small file size
- Easy to customize
- Dark mode built-in

### shadcn/ui

It's awesome because:

- Accessible by default
- Easy to customize
- Type-safe
- No extra JavaScript
- Easy to maintain

## Getting Started 🚀

1. Clone this at:

```bash
git clone https://github.com/ahsankhanmu/assist-aid.git
```

2. Install the good stuff:

```bash
cd assist-aid
npm install
```

3. Set up your environment:

```bash
.env
```

4. Start the dev server:

```bash
npm run dev
```

## Environment Variables 🔑

You'll need these:

```env
VITE_OPENAI_API_URL=https://www.ahsankhan.dev/api/openai
VITE_EMAIL_API_URL=https://www.ahsankhan.dev/api/email
```

## Want to Help? 🤝

Found a bug? Want to add a feature? Here's how:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add something cool'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

MIT License - feel free to use this however you want!

## Who Made This? 👨‍💻

- **Ahsan Khan** - The guy who built this thing - [GitHub](https://github.com/ahsankhanamu)

## Shoutouts 🙌

Big thanks to:

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for making CSS fun again
- [React Hook Form](https://react-hook-form.com/) for handling all the form stuff
- [i18next](https://www.i18next.com/) for making the app multilingual

---

P.S. If you find any typos or have suggestions, feel free to open an issue or PR. I'm always learning! 😊
