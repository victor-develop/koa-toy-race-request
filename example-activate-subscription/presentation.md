---
marp: true
---

---

# Agenda

 - real-life problem (race condition)
 - event sourcing + CQS
 - event sourcing + CQRS
 - event sourcing + CQRS optimization
 - DDD
 - Race condition solution: FIFO Queue v.s. Event sourcing

---

## Start with a real-life problem

 - billing api service
 - user fires two requests at the same time, and get double charged
 - demo `git checkout base-case`

---

# Event Sourcing

> Capture all changes to an application state as a sequence of events.
> by Martin Fowler

## Requirement for Events storage
 - Consistently Ordered
 - Immutable

### Example
 - FE: Redux
 - BE: Database Write-Ahead-Log
 - demo `git checkout evt-src-cqs`

---

# Event Sourcing problem

 - events keep growing
 - costly to calculate a state

I will answer this after explain `CQRS`

---

# CQRS

 - CQS = Command Query Separation
 - CQRS = Command Query `Responsibility` Separation
 - demo  `git checkout evt-src-cqrs`

---

# Back to Event Sourcing problem

 - events keep growing
 - costly to calculate a state

---

# Solve the Event Sourcing problem

 - events keep growing
 - costly to calculate a state
 - THEN -> save the state!

---

# save state *per processed event*

Demo


```js
git checkout evt-src-cqrs-cronjob
```

---

# DDD

😃

---

# Tricks

 - process one by one
    - FIFO queue: process write requests at linear order -> save the result
    - Events sourcing: save write requests at linear order -> process and calculate the result
---

# Q&A

Can I modify events after creation?

> No

- Source of truth
- Foundation of the whole system
- Src of truth wrong? rebuild the whole system (rewrite all the events)
- Question arise during refactor

