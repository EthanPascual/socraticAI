<h1>Socratic AI</h1>

<p>This project is a simple web application that engages users in Socratic Dialogue. It is powered by OpenAI's GPT-4 and built with a React frontend and FastAPI backend.</p>

<h2>Features</h2>
<ul>
  <li>Instructive chatbot engaging in Socratic Dialogue</li>
  <li>Basic NLP preprocessing using SpaCy</li>
  <li>Session-based chat history for multiple simultaneous conversations across tabs</li>
  <li>Deployed Frontend on Vercel and Backend on Render</li>
</ul>

<h2>Deployed Web App</h2>
<ul>
  <li><a href="https://socratic-ai-self.vercel.app/" target="_blank">Frontend (Vercel)</a></li>
  <li><a href="https://socraticai.onrender.com" target="_blank">Backend (Render)</a></li>
</ul>

<h2>Local Installation</h2>

<h3>1. Clone the repository</h3>
<pre><code>git clone https://github.com/EthanPascual/socraticAI.git
cd socratic-ai
</code></pre>

<h3>2. Set up the backend</h3>
<pre><code>cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
</code></pre>

<h4>Create a <code>.env</code> file with your OpenAI API key:</h4>
<pre><code>OPENAI_API_KEY=your_openai_api_key_here
</code></pre>

<h4>Run the backend server:</h4>
<pre><code>uvicorn main:app --reload --port 8000</code></pre>

<h3>3. Set up the frontend</h3>
<pre><code>cd ../frontend
npm install
</code></pre>

<h4>Create a <code>.env</code> file in <code>frontend/</code> and include the following:</h4>
<pre><code>VITE_API_URL=http://localhost:8000</code></pre>

<h4>Run the frontend server:</h4>
<pre><code>npm run dev</code></pre>

<h2>Usage</h2>
<p>Once both frontend and backend are running, navigate to <a href="http://localhost:5173" target="_blank">http://localhost:5173</a> in your browser.</p>
<p>Type a message into the chat box to begin a Socratic conversation.</p>

<h2>Notes</h2>
<ul>
  <li>Make sure the backend is running before interacting with the frontend.</li>
  <li>API errors will appear in the browser console for debugging.</li>
</ul>
