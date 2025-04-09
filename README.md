<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Overview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

<h1>Project Overview</h1>

<p>Welcome to our café's web application—a cutting-edge platform with a user-friendly interface featuring a circular menu, stunning gallery, music control, loading animation, and explore overlay. Developed using React for its modular architecture and styled with Tailwind CSS for a modern, responsive design.</p>

<h2>UI Components</h2>

<h3>CircularMenu</h3>
<p>Located in <code>src/components/navbar/CircularMenu.jsx</code>, this component provides a circular menu with seamless animations for opening and closing, enhancing user engagement.</p>

<h3>Gallery</h3>
<p>Found in <code>src/components/navbar/Gallery.jsx</code>, this component showcases a visually striking gallery of café images, complete with hover effects to elevate the user experience.</p>

<h3>MusicButton</h3>
<p>Situated in <code>src/components/Home/MusicButton.jsx</code>, this component offers a button for users to effortlessly play or pause background music.</p>

<h3>Loader</h3>
<p>Available in <code>src/components/Home/Loader.jsx</code>, this component features a loading animation, allowing users to choose to enter the site with or without music.</p>

<h3>ExploreOverlay</h3>
<p>Positioned in <code>src/components/Home/ExploreOverlay.jsx</code>, this component displays an overlay inviting users to explore various sections of the café.</p>

<h3>BookingForm</h3>
<p>Located in <code>src/components/Home/BookingFrom.jsx</code>, this component provides a simple form for making café reservations.</p>

<h2>Installation</h2>

<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/Mausam100/Amaya.git</code></pre>
    </li>
    <li>Navigate to the project directory:
        <pre><code>cd Amaya</code></pre>
    </li>
    <li>Install the dependencies:
        <pre><code>npm install</code></pre>
    </li>
</ol>

<h2>Usage</h2>

<ol>
    <li>Start the development server:
        <pre><code>npm run dev</code></pre>
    </li>
    <li>Open your browser and go to <code>http://localhost:3000</code> to explore the application.</li>
</ol>

<h2>Technologies Used</h2>

<ul>
    <li>React</li>
    <li>Tailwind CSS</li>
    <li>GSAP (GreenSock Animation Platform)</li>
    <li>@react-three/fiber</li>
    <li>@react-three/drei</li>
</ul>

<h2>License</h2>

<p>This project is distributed under the MIT License. For more details, refer to the <a href="LICENSE">LICENSE</a> file.</p>

<p>Visit the live application at <a href="https://amaya-sable.vercel.app">amaya-sable.vercel.app</a></p>

</body>
</html>
