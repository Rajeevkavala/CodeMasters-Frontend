# Code Masters LMS

Code Masters is a Learning Management System (LMS) designed to provide **free coding education** for learners of all skill levels. 
The platform includes organized resources, structured learning paths, hands-on projects, and an AI-powered chatbot for personalized guidance.

## Features

### 1. Accessibility and Inclusivity
- Free and open-access resources.
- Diverse representation in content.
- Adaptive learning tools for personalized experiences.

### 2. Structured Learning
- Comprehensive coding roadmaps for various technologies.
- Modular course design for incremental progress.
- User progress tracking.

### 3. AI-Powered Doubt Solving
- AI chatbot offering real-time assistance.
- 24/7 support for answering coding-related questions.
- Interactive problem-solving with personalized guidance.

### 4. Community and Collaboration
- Opportunities for peer interaction.
- Mentorship programs and group projects.

### 5. Practical Application
- Hands-on projects and coding exercises.
- Code repositories for learning and sharing.
- Assessments with detailed feedback.

### 6. Continuous Improvement
- Regular curriculum updates.
- User feedback integration.
- Performance analytics to track learning impact.

## Tech Stack

### Frontend
- **React**

### Backend
- **Spring Boot**

### Database
- **MongoDB**

### AI Chatbot
- **Gemini API** and **NTP PyTorch**


## Installation

### Prerequisites
- Node.js
- Java (JDK 17 or higher)
- MongoDB

### Steps to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/codemasters-lms.git
   cd codemasters-lms
   ```

2. **Set up the frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Set up the backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

4. **Configure MongoDB:**
   - Start the MongoDB server.
   - Update the MongoDB URI in the backend configuration file (application.properties or application.yml).

5. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000`.

## Contribution Guidelines

We welcome contributions to make Code Masters better! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes.
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch.
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

**Let's code and learn together with Code Masters!**
