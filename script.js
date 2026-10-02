/* ===== EDIT YOUR DETAILS HERE ===== */
const PROFILE = {
  name: "Ayotah Ingiambi Endali",
  role: "Web Designer & Developer",
  location: "Yaoundé, Cameroon | +237 652 352 448",
  bio: "Innovative web designer and developer with strong problem-solving skills and a creative, practical approach to complex challenges. I bring clear communication to the full web development process, from building websites to managing content, with a focus on performance and user experience.",
    skills: ["HTML", "CSS", "JavaScript", "Java", "Python", "Debugging", "Software Frameworks", "UX & UI Design", "Problem Solving", "Creativity", "Attention to Detail", "Teamwork"],
    responsibilities: [
      "Write well-designed, testable, efficient code using software development best practices.",
      "Build website layouts and user interfaces with standard HTML and CSS practices.",
      "Integrate data from back-end services and databases.",
      "Gather and refine specifications and requirements based on technical needs.",
      "Create and maintain software documentation.",
      "Maintain, expand, and scale websites; keep up with emerging technologies and industry trends.",
      "Work with web designers to match visual design intent."
    ],
  timeline: [
    ["2026", "Higher National Diploma (HND)", "Awarded in 2026."],
    ["2024 - Present", "University Studies", "Fobang Institute."],
      ["2022 - Present", "Computer Science Teacher", "Power of Grace Evening School, Superette, Yaoundé. Teach JavaScript and computer science, prepare lesson plans, tutor students, and keep course content current."],
    ["2021 - 2022", "Advanced Level Certificate", "LEADEX Evening School."]
  ],
    languages: ["English - Excellent", "French - Excellent", "Pidgin - Excellent"],
    hobbies: ["Reading inspirational books", "Listening to music"],
    email: "ayotahendali16@gmail.com",
    phone: "+237652352448",
    declaration: "I certify that the information above is true and correct to the best of my knowledge and ability. If given the opportunity to serve, I will carry out assigned duties to your satisfaction.",
    links: [["Email", "mailto:ayotahendali16@gmail.com"], ["Call", "tel:+237652352448"]]
};

/* ===== RENDER ===== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
document.title = PROFILE.name + " — Portfolio";
$("logo").textContent = $("name").textContent = $("foot").textContent = PROFILE.name;
$("role").textContent = PROFILE.role;
$("location").textContent = PROFILE.location;
$("bio").textContent = PROFILE.bio;
$("year").textContent = new Date().getFullYear();
$("skillList").innerHTML = PROFILE.skills.map(s => `<span class="chip">${esc(s)}</span>`).join("");
$("responsibilityList").innerHTML = PROFILE.responsibilities.map(item => `<li>${esc(item)}</li>`).join("");
$("timeline").innerHTML = PROFILE.timeline.map(([d, t, x]) => `<li><small>${esc(d)}</small><h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join("");
$("languageList").innerHTML = PROFILE.languages.map(item => `<span class="chip">${esc(item)}</span>`).join("");
$("hobbyList").innerHTML = PROFILE.hobbies.map(item => `<span class="chip">${esc(item)}</span>`).join("");
$("contactDetails").textContent = `${PROFILE.location} | ${PROFILE.email}`;
$("declaration").textContent = PROFILE.declaration;
$("links").innerHTML = PROFILE.links.map(([n, u]) => `<a href="${esc(u)}">${esc(n)}</a>`).join("");

$("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Portfolio message from " + f.get("n"))}&body=${encodeURIComponent(f.get("m") + "\n\n" + f.get("e"))}`;
});

/* mobile menu */
const burger = $("burger"), menu = $("menu");
const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
menu.addEventListener("click", closeMenu);

/* reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* 3D tilt on cards (mouse devices only) */
if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
  document.querySelectorAll(".card").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
    });
    c.addEventListener("pointerleave", () => c.style.transform = "");
  });
}

/* ===== 3D BACKGROUND (Three.js) ===== */
(function () {
  const canvas = $("bg");
  if (typeof THREE === "undefined") return;
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, .1, 100);
  camera.position.z = 8;

  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.7, .5, 160, 20), new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: .55 }));
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(.9, 1), new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: .7 }));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.4, .015, 8, 120), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: .5 }));
  ring.rotation.x = 1.2;
  const group = new THREE.Group(); group.add(knot, ico, ring); scene.add(group);

  const N = 700, pos = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - .5) * 40;
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: .05, transparent: true, opacity: .7 }));
  scene.add(stars);

  let mx = 0, my = 0, sy = 0, narrow = false;
  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    narrow = w < 760;
    group.scale.setScalar(narrow ? .62 : 1);
  }
  addEventListener("resize", resize); resize();
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  addEventListener("scroll", () => sy = scrollY, { passive: true });

  const clock = new THREE.Clock();
  function frame() {
    const t = reduce ? 0 : clock.getElapsedTime();
    const prog = sy / Math.max(1, document.body.scrollHeight - innerHeight);
    knot.rotation.x = t * .25 + prog * 5; knot.rotation.y = t * .35;
    ico.rotation.x = -t * .6; ico.rotation.y = t * .5;
    ring.rotation.z = t * .2;
    stars.rotation.y = t * .01 + prog * 1.5;
    group.position.x += ((narrow ? 0 : 2.6 - prog * 5) - group.position.x) * .05;
    group.position.y += ((narrow ? 1.8 : 0) + Math.sin(t) * .15 - my * .6 - group.position.y) * .05;
    camera.position.x += (mx * 1.2 - camera.position.x) * .05;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(frame);
  }
  frame();
  if (reduce) addEventListener("scroll", frame, { passive: true });
})();
