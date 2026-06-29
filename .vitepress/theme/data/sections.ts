export interface SectionCard {
  title: string
  link: string
  description: string
  status?: string
  group?: string
}

export interface Section {
  title: string
  intro: string
  cards: SectionCard[]
}

export const sections: Record<string, Section> = {
  'ai-analytics': {
    title: 'AI analytics',
    intro:
      '<p>I use AI on research data in two contexts: conversational bibliometrics is about natural-language access to bibliometric analysis: prototypes that let a user steer an analytical workflow in plain language, across a few different architectures. The AI workflows spanned: targeted enhancement and enrichment tasks: metadata, geography, field monitoring; where AI handles a specific step in an otherwise structured pipeline.</p>',
    cards: [
      {
        group: 'Conversational bibliometrics',
        title: 'The AI metascientist',
        link: '/ai-analytics/ai-metascientist/',
        description:
          'A governed analytics framework for conversational bibliometrics.',
        status: 'proof of concept',
      },
      {
        group: 'Conversational bibliometrics',
        title: 'DimQuery',
        link: '/ai-analytics/dimquery/',
        description:
          'Schema-aware Custom GPT for writing Dimensions queries on BigQuery.',
        status: 'live tool',
      },
      {
        group: 'Conversational bibliometrics',
        title: 'Claude Projects',
        link: '/ai-analytics/corpus-builder/',
        description: 'Claude Projects as analytical workflows.',
        status: 'implemented',
      },
      {
        group: 'Conversational bibliometrics',
        title: 'BiblioFlow',
        link: '/ai-analytics/biblioflow/',
        description:
          'Design for a local, governed bibliometric workflow system.',
        status: 'concept',
      },
      {
        group: 'AI workflows',
        title: 'Research org typology',
        link: '/ai-analytics/grid-plus/',
        description:
          'Five-dimensional organisation classification across legal form, funding, governance, territory, and role.',
        status: 'validated',
      },
      {
        group: 'AI workflows',
        title: 'Journalscape',
        link: '/ai-analytics/journalscape/',
        description:
          'Classifying geographic terms in journal titles by semantic role.',
        status: 'classifier validated',
      },
      {
        group: 'AI workflows',
        title: 'Biblioscope',
        link: '/ai-analytics/biblioscope/',
        description:
          'Field monitoring pipeline to track emerging methodologies against a frozen corpus structure.',
        status: 'operational',
      },
    ],
  },
  evaluation: {
    title: 'Evaluation',
    intro:
      '<p>In AI analytics, I never assume an output will be reliable on the first turn, which is why I say I <a href="/ai-analytics/corpus-builder/">work slowly</a>; I also build in relevant validation of the input and verification of the output, rather than trusting either by default.</p><p>Below are four examples:</p><ul><li>The <strong>vacuity index</strong> is an experiment I wrote for <em>Research Musings</em>, and the inspiration behind validating the input in AV|VA.</li><li><strong>AV|VA</strong> is the framework the rest grew around: a proposition for proportionate validation and verification, scaled to what the LLM is being used for and what the task actually requires.</li><li>The <strong>verification comparison</strong> is a simplified methodology I built at work to decide which LLM we should keep internally, and to show that an AI output isn\'t to be trusted on the first turn, however fluent it reads.</li><li><strong>Red-teaming an analytical agent</strong> is what I check when the user is adversarial rather than honest: whether a system holds its methodological and commercial integrity under pressure, not just its credentials.</li></ul>',
    cards: [
      {
        title: 'Vacuity index',
        link: '/evaluation/vacuity-index/',
        description:
          'An experiment I wrote for Research Musings, and the inspiration behind validating the input in AV|VA.',
      },
      {
        title: 'AV|VA',
        link: '/evaluation/av-va/',
        description:
          'The framework those two cases sit around: a proposition for proportionate validation and verification, scaled to what the LLM is being used for and what the task actually requires.',
      },
      {
        title: 'Verification comparison',
        link: '/evaluation/verification-comparison/',
        description:
          'A simplified methodology I built at work to decide which LLM we should keep internally and to show that an AI output isn\'t to be trusted on the first turn, however fluent it reads.',
      },
      {
        title: 'Red-teaming an analytical agent',
        link: '/evaluation/red-teaming/',
        description:
          'Red-teaming a pre-launch analytical agent — and the dimensions standard probes miss: whether it keeps its methodological and commercial integrity, not just its secrets.',
      },
    ],
  },
  writing: {
    title: 'Writing',
    intro:
      'A couple of years ago I started <a href="https://researchmusings.substack.com"><i>Research Musings</i></a>: a Substack to share analytics built on Dimensions.ai (my employer\u2019s bibliometric database), alongside reflections on the research community and, increasingly, on using AI in research and analytics.<br/>Check the <em>Research Musings</em> page for more details on recurring threads, like conversational bibliometrics.<br/>To write the newsletter I built a method for getting Claude to draft in my voice: not perfectly, but reliably faster; <em>Interviewing yourself</em> gives some details. And because visualisation has always been part of my work, I have extended Tufte\u2019s visual grammar with two extensions: <em>Tufte\u2019s extensions</em>.',
    cards: [
      {
        title: 'Research Musings',
        link: '/writing/research-musings/',
        description:
          'Substack on the mechanics of research: how knowledge is made, measured, and mediated.',
      },
      {
        title: 'Interviewing yourself',
        link: '/writing/interviewing-yourself/',
        description:
          'A method for building a writing guide so an AI drafts in your voice, not its own.',
      },
      {
        title: 'Tufte\u2019s extensions',
        link: '/writing/tufte-extensions/',
        description:
          'Extension to Tufte\u2019s chart grammar: small multiples and bumped stack bar.',
      },
    ],
  },
  about: {
    title: 'About',
    intro:
      '<p>Here\u2019s a bit about me:</p><ul><li>my background \u2014 where I come from intellectually and where my skills come from: geomatics, spatial data, a PhD, then research data science</li><li>my approach \u2014 how I use AI, what I let it do, and how I validate and verify</li></ul>',
    cards: [
      {
        title: 'Approach',
        link: '/about/approach/',
        description: 'Principles',
      },
      {
        title: 'Background',
        link: '/about/background/',
        description: 'Route',
      },
    ],
  },
  builds: {
    title: 'Builds',
    intro: '',
    cards: [
      {
        title: 'Loom',
        link: '/builds/loom/',
        description:
          'Local-first work tracker: one keystroke to capture what you are working on.',
      },
      {
        title: 'Children voice assistant',
        link: '/builds/children-voice-assistant/',
        description:
          'Raspberry Pi voice assistant for songs and Simple Wikipedia facts, without the cloud.',
      },
    ],
  },
}
