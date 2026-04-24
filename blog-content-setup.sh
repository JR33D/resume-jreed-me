#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# blog-content-setup.sh
#
# Run this once to scaffold a blog-content repo that feeds jreed.me.
#
# Usage:
#   chmod +x blog-content-setup.sh
#   ./blog-content-setup.sh               # creates ./blog-content/
#   ./blog-content-setup.sh my-dir        # creates ./my-dir/
#
# After running:
#   1. cd into the new directory
#   2. git remote add origin <your-github-or-gitea-url>
#   3. git push -u origin main
#   4. Set BLOG_CONTENT_URL in your resume app's env to the raw base URL
#      e.g. https://raw.githubusercontent.com/JR33D/blog-content/main
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

DIR="${1:-blog-content}"

if [ -d "$DIR" ]; then
  echo "Directory '$DIR' already exists. Aborting." >&2
  exit 1
fi

mkdir "$DIR"
cd "$DIR"

# ── index.json ────────────────────────────────────────────────────────────────
cat > index.json << 'EOF'
[
  {
    "slug": "on-being-the-second-engineer",
    "title": "On Being the Second Engineer",
    "date": "2025-08-14",
    "tags": ["Career"],
    "read": 6,
    "excerpt": "The second engineer on a team shapes the culture more than the first. Here is what I have learned over four hirings."
  },
  {
    "slug": "event-driven-without-the-event-framework",
    "title": "Event-Driven, Without the Event Framework",
    "date": "2025-05-02",
    "tags": ["Architecture"],
    "read": 9,
    "excerpt": "You do not need Kafka to start. Start with Postgres LISTEN/NOTIFY and earn your complexity."
  },
  {
    "slug": "reading-architecture-diagrams",
    "title": "Reading Architecture Diagrams Like a Hawk",
    "date": "2025-01-21",
    "tags": ["Architecture", "Career"],
    "read": 7,
    "excerpt": "Three diagnostic questions I ask of every architecture diagram I am shown."
  },
  {
    "slug": "the-quiet-power-of-a-boring-stack",
    "title": "The Quiet Power of a Boring Stack",
    "date": "2024-10-08",
    "tags": ["Opinion"],
    "read": 5,
    "excerpt": "Most of my best decisions have been boring. A defense of dull technology choices."
  },
  {
    "slug": "mentorship-is-a-design-problem",
    "title": "Mentorship Is a Design Problem",
    "date": "2024-06-30",
    "tags": ["Career"],
    "read": 8,
    "excerpt": "The best mentors I have had designed their mentorship intentionally. Six patterns that show up again and again."
  }
]
EOF

# ── on-being-the-second-engineer.mdx ─────────────────────────────────────────
cat > on-being-the-second-engineer.mdx << 'EOF'
---
title: On Being the Second Engineer
date: "2025-08-14"
tags: ["Career"]
read: 6
excerpt: The second engineer on a team shapes the culture more than the first. Here is what I have learned over four hirings.
---

## The problem with being first

The first engineer on a team gets to make all the decisions. The stack, the patterns, the folder structure, the commit message convention. It feels like power. It is not. It is debt — every decision you make alone is one more thing the next person has to accept or fight.

The second engineer is where culture actually gets set.

## What the second engineer does

When engineer #2 joins, they have two choices: assimilate or negotiate. If they assimilate silently, the first engineer's assumptions become law. If they negotiate, you get something better: a culture of explicit decisions.

I have been the second engineer four times. Each time, the most valuable thing I did in my first 30 days was not write code. It was ask *why*.

> Why are we using this ORM?
> Why do we deploy on Fridays?
> Why is this service a monolith?

Not to challenge. To document. Because if engineer #1 cannot answer "why," that is your first sign that the decision was never made — it just happened.

## Patterns that work

**Write down the first ADRs.** Architecture Decision Records do not need to be fancy. A paragraph explaining what you chose and what you rejected is enough. You are not doing this for the current team. You are doing it for engineer #6.

**Ask about the things that are not code.** On-call rotation, incident postmortems, PR review etiquette. These matter more than which database you pick. They are also the things that get cargo-culted hardest.

**Name the culture you want.** You cannot wait for culture to emerge. You have to say it out loud: *I want a team where people feel safe to say they do not know something.* Say it early, often, and model it yourself.

## What I got wrong

I used to think my job was to prove I could ship fast. So I shipped fast. I introduced two bugs in my first week that caused a Friday night incident. I fixed them, wrote the postmortem, and learned more in that 48-hour stretch than in the previous month.

Speed is not the signal. Reliability is. Being the person who ships *and* writes the test is worth ten people who ship twice as fast and clean up after themselves.

## The longer view

Every team I have joined, I have tried to leave better than I found it. Not heroically — just incrementally. One runbook at a time. One test at a time. One honest conversation at a time.

The second engineer sets the tone. Take that seriously.
EOF

# ── event-driven-without-the-event-framework.mdx ─────────────────────────────
cat > event-driven-without-the-event-framework.mdx << 'EOF'
---
title: Event-Driven, Without the Event Framework
date: "2025-05-02"
tags: ["Architecture"]
read: 9
excerpt: You do not need Kafka to start. Start with Postgres LISTEN/NOTIFY and earn your complexity.
---

## The talk I give in every architecture review

When a team tells me they want to go event-driven, the first thing I ask is: what problem are you actually solving?

Usually the answer is one of three things:

1. We want services to communicate without tight coupling
2. We want audit logs or replay capability
3. We read a blog post about Kafka

The third one is the most common. It is also the most dangerous.

## What Kafka actually gives you

Kafka is a distributed, partitioned, replicated log. It is very good at:

- High-throughput message ingestion (millions/sec)
- Long-term message retention
- Fan-out to many independent consumers
- Strict ordering within a partition

If you need those things, Kafka is the right tool. If you are a team of four shipping a SaaS product with 500 customers, you probably do not need those things yet.

## What Postgres gives you for free

Most teams running Postgres do not know about `LISTEN/NOTIFY`. It is a lightweight pub/sub mechanism built into the database:

```sql
-- Producer
NOTIFY my_channel, '{"order_id": 42, "status": "paid"}';

-- Consumer (in your app)
LISTEN my_channel;
```

Your application receives the notification over the existing database connection. No broker to operate. No separate infrastructure. No new failure mode.

## The outbox pattern

The classic problem with event-driven systems is dual-write: you write to the database *and* publish to the broker, and one of them fails. Your data is now inconsistent.

The solution is the transactional outbox:

```sql
CREATE TABLE outbox (
  id         BIGSERIAL PRIMARY KEY,
  topic      TEXT NOT NULL,
  payload    JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at    TIMESTAMPTZ
);
```

Write to your domain table and the outbox in the same transaction. A separate worker polls `WHERE sent_at IS NULL`, publishes the event, and marks it sent. If the worker crashes, the event stays in the outbox and gets retried.

This pattern works with any broker — including Kafka, when you eventually need it.

## When to upgrade

Start with `LISTEN/NOTIFY`. Promote to the outbox pattern when you need durability. Move to Kafka when you have:

- More consumers than Postgres connections can comfortably serve
- Message volumes that saturate your Postgres write throughput
- Retention requirements measured in weeks or months
- Multiple independent teams consuming the same stream

Earn the complexity. Your future self will thank you.
EOF

# ── reading-architecture-diagrams.mdx ────────────────────────────────────────
cat > reading-architecture-diagrams.mdx << 'EOF'
---
title: Reading Architecture Diagrams Like a Hawk
date: "2025-01-21"
tags: ["Architecture", "Career"]
read: 7
excerpt: Three diagnostic questions I ask of every architecture diagram I am shown.
---

## The diagram is never the system

Every architecture diagram I have ever been shown is a lie. Not a malicious lie — an optimistic one. The diagram shows the happy path, the intended flow, the system as the architect hoped it would be.

The system as it actually runs is different. It has the retry logic that was added after the first outage. It has the undocumented cron job that nobody owns. It has the database that got added in a hotfix and never removed.

Learning to read diagrams means learning to ask what is missing.

## Question one: where does time live?

Every distributed system has a concept of time. The question is: whose clock are you trusting?

Look at the diagram and ask: if two services receive an event at the same time, how does the system decide which one wins? If there is no answer on the diagram, there is no answer in the system — which means the answer is "whoever wrote last."

That is usually fine until it is not.

## Question two: what happens when this arrow fails?

Pick an arrow — any arrow — between two boxes on the diagram. Ask: what does the left box do when the right box does not respond?

Retries? Dead-letter queue? It silently succeeds and logs a warning? It crashes?

Most diagrams show arrows as lossless, bidirectional, instantaneous. Real networks are none of those things. If the diagram does not show error paths, the error paths have not been designed — they have been discovered, usually at 2am.

## Question three: who owns the data at rest?

Data has a home. Look at every database, queue, and cache on the diagram. Ask: who is allowed to write here? Who is allowed to read? What happens if this data is wrong?

In my experience, the most dangerous lines in any system are the ones that cross a data-ownership boundary invisibly. Service A reads from Service B's database directly. A cron job writes into a table that is supposed to be owned by a single service.

These show up on diagrams as a simple arrow. They show up in incidents as cascading failures.

## The question behind the questions

All three questions are really asking the same thing: *what are the assumptions this system makes, and what happens when those assumptions break?*

Good architecture is not about drawing the right boxes. It is about being explicit about the assumptions and making sure every assumption has a named owner who will be paged when it fails.

Ask for that diagram. You will learn more from it than from the happy-path version.
EOF

# ── the-quiet-power-of-a-boring-stack.mdx ────────────────────────────────────
cat > the-quiet-power-of-a-boring-stack.mdx << 'EOF'
---
title: The Quiet Power of a Boring Stack
date: "2024-10-08"
tags: ["Opinion"]
read: 5
excerpt: Most of my best decisions have been boring. A defense of dull technology choices.
---

## The conference talk you will not see

Nobody gives a talk called "We Used Postgres and It Was Fine." Nobody writes a blog post called "We Chose Node.js Because the Team Already Knew It."

Boring decisions do not generate conference talks. They generate revenue.

## What boring actually means

Boring technology is not outdated technology. It is technology that has been in production long enough that its failure modes are well understood, its operational surface is documented, and its community has already solved most of the problems you will encounter.

Postgres is boring. It has been boring for twenty years. It also handles JSON, full-text search, time-series data, geospatial queries, pub/sub, and logical replication. Teams reach for five separate services to do what Postgres already does.

Redis is boring. Nginx is boring. Linux is boring. These are boring the way a Swiss watch is boring: extremely good at a specific thing, extremely reliable, extremely well-understood.

## The hidden cost of exciting choices

Every non-boring technology choice has a learning tax. Someone on your team has to become the expert. That person becomes a single point of failure. When they leave, you have an "exciting" technology and nobody who understands it.

I have inherited two systems built on technologies the original team thought were exciting. Both of them were my first on-call introduction to the concept of "nobody knows why this works."

## The hiring argument

Boring stacks hire better. When you need to grow a team, you want to interview people against a known surface. "Can you write a SQL query?" is a question with a clear answer. "Can you reason about our proprietary event sourcing framework?" is a question that will filter out every good engineer who values their time.

## When to be exciting

There is a place for new technology. It is:

- A contained prototype where you are explicitly learning
- A use case that boring technology genuinely cannot handle
- A place where the cost of getting it wrong is low

Everywhere else, be boring. Be so boring that operations is uneventful. Be so boring that your oncall is quiet. Be so boring that your engineers can think about the actual product instead of the infrastructure.

Boring is a competitive advantage.
EOF

# ── mentorship-is-a-design-problem.mdx ───────────────────────────────────────
cat > mentorship-is-a-design-problem.mdx << 'EOF'
---
title: Mentorship Is a Design Problem
date: "2024-06-30"
tags: ["Career"]
read: 8
excerpt: The best mentors I have had designed their mentorship intentionally. Six patterns that show up again and again.
---

## The accidental mentor

Most mentorship happens by accident. A senior engineer sits near a junior one. Questions get asked. Answers get given. Over time, if you are lucky, a relationship develops.

This works, but it is fragile. It depends on proximity, availability, and the luck of being near someone who happens to be both good and generous.

The best mentors I have had did not leave this to chance. They designed it.

## Pattern one: the explicit contract

Good mentors say out loud what mentorship will look like. Not "let me know if you need anything" — that puts all the burden on the person with the least context. Instead: "We will meet every two weeks. Bring one thing you are stuck on and one thing you are proud of."

An explicit contract removes the awkwardness of asking. It creates a ritual. Rituals are where growth happens.

## Pattern two: the question behind the question

When a junior engineer asks "how do I do X," the right answer is rarely just "do X." The right answer involves understanding why they want to do X, whether X is the right approach, and what they will do when X does not work.

The question behind the question is: *what are you actually trying to accomplish?*

Teaching this meta-skill — the habit of questioning your own framing — is more valuable than any specific answer.

## Pattern three: narrating your own thinking

The most useful thing a senior engineer can do is think out loud. Not to explain, but to demonstrate that senior thinking is not magic. It is a process: "I am not sure. Let me check the docs. Okay, so the constraint is X, which means we have three options..."

Junior engineers often believe that senior engineers just know things. Showing them the searching, the uncertainty, and the iteration is the most honest mentorship there is.

## Pattern four: the portfolio of failures

Share your own failures deliberately. Not as confession, but as curriculum. "Here is a bug I introduced in 2019 and what I learned from it. Here is a project I scoped wrong and why. Here is a technical argument I lost and why the person who disagreed with me was right."

Failure stories teach things that success stories cannot: that failure is survivable, that learning is nonlinear, and that even senior engineers are wrong regularly.

## Pattern five: the graduated handoff

Good mentors give ownership gradually. First: "I will do it, you watch." Then: "We will do it together." Then: "You do it, I will review." Then: "You own it."

The graduation has to be explicit and celebrated. "I am handing this to you because I trust you with it" is a sentence that many engineers have never heard and will remember for the rest of their careers.

## Pattern six: the exit

The goal of a mentor is to make themselves unnecessary. The best mentoring relationships end with the mentee not needing the mentor anymore — and both people knowing it was a success.

Design for this from the beginning. What does "done" look like? What will the mentee be able to do that they cannot do now? Name it at the start and measure it at the end.

Mentorship is not a relationship. It is a project. Treat it like one.
EOF

# ── .gitignore ────────────────────────────────────────────────────────────────
cat > .gitignore << 'EOF'
.DS_Store
*.swp
EOF

# ── README.md ─────────────────────────────────────────────────────────────────
cat > README.md << 'EOF'
# blog-content

External blog content repo for [jreed.me](https://jreed.me).

## Structure

```
index.json          ← post metadata array (title, date, tags, read, excerpt)
<slug>.mdx          ← post body with frontmatter
```

## Adding a post

1. Create `<slug>.mdx` with frontmatter matching the schema below
2. Prepend an entry to `index.json`
3. Push to main — the site revalidates within 5 minutes, no redeploy needed

### Frontmatter schema

```yaml
---
title: Post Title
date: "YYYY-MM-DD"
tags: ["Tag"]
read: 5          # estimated read time in minutes
excerpt: One sentence summary shown in the post list.
---
```
EOF

# ── Git init & first commit ───────────────────────────────────────────────────
git init -b main
git add .
git commit -m "Initial blog content (5 posts)"

echo ""
echo "✓ blog-content repo created in ./$DIR"
echo ""
echo "Next steps:"
echo "  cd $DIR"
echo "  git remote add origin <your-repo-url>"
echo "  git push -u origin main"
echo ""
echo "Then set in your resume app's environment:"
echo "  BLOG_CONTENT_URL=https://raw.githubusercontent.com/JR33D/<repo>/main"
