// personal-page.js

class PersonalPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['name', 'title', 'location', 'avatar', 'theme', 'portals', 'experience'];
  }

  get name() {
    return this.getAttribute('name') || 'Srdjan Strbanovic';
  }

  get title() {
    return this.getAttribute('title') || 'Software Engineer';
  }

  get location() {
    return this.getAttribute('location') || 'NYC Tri-State Area';
  }

  get avatar() {
    return this.getAttribute('avatar') || '[⊣˚∆˚⊢]';
  }

  get theme() {
    return this.getAttribute('theme') || 'dark';
  }

  get portals() {
    return JSON.parse(this.getAttribute('portals') || '[]');
  }

  get experience() {
    return JSON.parse(this.getAttribute('experience') || '[]');
  }

  connectedCallback() {
    this.loadShoelace().then(() => {
      this.render();
      this.initializeAnimations();
    });
  }

  loadShoelace() {
    return new Promise((resolve) => {
      if (customElements.get('sl-button')) {
        resolve();
      } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js';
        script.onload = () => resolve();
        document.head.appendChild(script);
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${this.getStyles()}
      </style>
      ${this.getHTML()}
    `;
  }

  getStyles() {
    return `
      :host {
        --sl-color-primary-600: ${this.theme === 'dark' ? '#64ffda' : '#0077b5'};
        --sl-panel-background-color: ${this.theme === 'dark' ? '#112240' : '#ffffff'};
        --sl-color-neutral-0: ${this.theme === 'dark' ? '#0a192f' : '#f0f0f0'};
        --sl-color-neutral-1000: ${this.theme === 'dark' ? '#8892b0' : '#333333'};
        
        display: block;
        background-color: var(--sl-color-neutral-0);
        color: var(--sl-color-neutral-1000);
        font-family: var(--sl-font-sans);
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }

      header {
        text-align: center;
        margin-bottom: 3rem;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      h2 {
        color: var(--sl-color-primary-600);
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .section {
        margin-bottom: 3rem;
      }

      .portals {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .work-experience {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      sl-card::part(base) {
        background-color: var(--sl-panel-background-color);
      }

      @media (max-width: 768px) {
        .container {
          padding: 1rem;
        }

        h1 {
          font-size: 2rem;
        }

        h2 {
          font-size: 1.2rem;
        }

        .work-experience {
          grid-template-columns: 1fr;
        }

        .portals {
          flex-direction: column;
          align-items: center;
        }
      }
    `;
  }

  getHTML() {
    return `
      <div class="container">
        <header>
          <sl-avatar image="${this.avatar}" label="${this.name}" style="--size: 6rem;"></sl-avatar>
          <h1>${this.name}</h1>
          <h2>${this.title} - ${this.location}</h2>
        </header>

        <section class="section">
          <h2>Portals</h2>
          <div class="portals">
            ${this.getPortals()}
          </div>
        </section>

        <section class="section">
          <h2>Work Experience</h2>
          <div class="work-experience">
            ${this.getWorkExperience()}
          </div>
        </section>
      </div>
    `;
  }

  getPortals() {
    return this.portals.map(portal => `
      <sl-button href="${portal.url}" target="_blank" rel="noopener noreferrer">
        <sl-icon name="${this.getIconName(portal.name)}" slot="prefix"></sl-icon>
        ${portal.name}
      </sl-button>
    `).join('');
  }

  getIconName(portalName) {
    const iconMap = {
      'GitHub': 'github',
      'LinkedIn': 'linkedin',
      'Twitter': 'twitter',
      // Add more mappings as needed
    };
    return iconMap[portalName] || 'link';
  }

  getWorkExperience() {
    return this.experience.map(job => `
      <sl-card>
        <h3 slot="header">${job.title}</h3>
        <p><a href="${job.url}" target="_blank" rel="noopener noreferrer">${job.company}</a></p>
      </sl-card>
    `).join('');
  }

  initializeAnimations() {
    // Add animations if desired
  }
}

customElements.define('personal-page', PersonalPage);