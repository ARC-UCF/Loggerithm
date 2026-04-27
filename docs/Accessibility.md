# Accessibility

**This document is currently in progress and not complete.**

Accessibility features are pertinent to software-based material, and as this club is focused on being welcoming to everyone of all walks of life, I've made it part of my mission to ensure accessibility is good for this software/website, which includes adding screenreader details and features to make sure it those with visibility issues among other disabilities are capable of using the site. 

When it comes to website development, a good site for checking accessibility is (Deque University's Web Accessibility Checklist)[https://dequeuniversity.com/checklists/web/]. This is good for a full view of all the accessibility requirements which make a website accessible, such as alt text and the like. 

Even so, I'm going to document some of the most critical features which this website/software needs to ensure good accessibility. 

## Aria-Label

`aria-label` is a field which can be attached to most HTML elements, but serves a particularly good purpose on buttons and links, as those most commonly run into issues with screen readers. Also, unlabeled buttons tend to just be read as "button", which is not specific nor useful for anyone with a screen reader. Hence, you will find it better to use aria-label as a field on a button to give the button a name that screen readers can read.

## Page Titles

Including for static pages of the site where the page is toggled without navigating elsewhere, the page title should be updated to accurately reflect what the page content represents.

## Headings

Headings should: 

* Not skip levels, ie. do not skip straight to heading 2 (or `<h2>`), and start instead from `<h1>`.
* Should be used when text decoratively or structurally represents the heading of content.
* Headings should be used when it is an actual heading.
