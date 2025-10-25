---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: Introduction to Copulas in Probability Theory  
slug: introduction-to-copulas-probability-theory  
tags:  
  - probability-theory  
  - copulas  
  - statistics  
  - data-modeling  
  - machine-learning  
description: Explore the concept of copulas in probability theory, their role in modeling dependence between random variables, and their applications in fields like risk management, synthetic data generation, and machine learning.
---

This article is a high level overview of some of the concepts mentioned on this [Wiki Page](<https://en.wikipedia.org/wiki/Copula_(probability_theory)>) on probability theory.

Copulas are important functions that explain the dependence between 2 or more random variables.

Common uses can be found within risk management, portfolio optimization problems, derivatives pricing, climate/weather predictions and signal processing.

More recently copulas are being used within machine learning to help generate synthetic tabular data. Using a copula you can train a model to recognize the statistical properties of a dataset and then sample from the trained model to produce “synthetic” data which in theory, maintains the same statistical properties as the original dataset.

In this article I will review the basic concept of copulas.

## What is a copula?

The word copula means to “link/combine things together”. In probability theory, copulas are important functions that explain the dependance between 2 or more random variables. Specifically, they are used to combine individual “marginal” distributions of single random variables to arrive at the joint distribution of these variables.

**Example**
Consider 2 random variables: X₁ and X₂

_Case 1_: X₁ and X₂ are independent.
![copulas_ex1.png](/copulas_ex1.png) where f is the probability density function. So for the case that we have 2 independent variables, the joint distribution of these variables is simply the marginal density functions multiplied together.

_Case 2_: X₁ and X₂ are dependent + we know the distributions of X₁ and X₂ (e.g gaussian).
![copulas_ex2.png](/copulas_ex2.png). In the case that we know the distributions of x1 and x2, then we can simply look up from literature the correlation function ρ12 that explains the dependence that x1 and x2 have.

_Case 3_: X₁ and X₂ are Dependent + ?? no information about their distributions.
![copulas_ex3.png](/copulas_ex3.png). In the case that we don’t know the distributions of our random variables x1 and x2, then all we can say is that there must be some copula function C that explains their dependence even if we don’t know it yet.

The equation in _case 3_ is known as [Sklar's Theorem](<https://en.wikipedia.org/wiki/Copula_(probability_theory)>), which simply states that the joint distribution of 2 random variables is simply the product of their _marginals x copula_.

**In summary so far:**

**A copula is a function that contains the dependence information between 2 or more random variables and tells you how they are correlated.**

_Marginal distributions x copula = Joint Distribution_

### Probability Density Function

Even though I’ve only mentioned the probability density function (PDF) when talking about joint and marginal distributions, if someone asks for the joint distribution between 2 variables you could also answer using the correlated density function (CDF). For simplicity we’ll denote the difference using f or F respectively:
![copulas_pdf.png](/copulas_pdf.png)

### Correlated Density Function

![copulas_cdf.png](/copulas_cdf.png) where PDF is the derivative of the CDF.

## Cross Applying Copulas and Mapping

Because copulas only contain the dependence information, they are not specific to any particular random variables. Therefore you can apply copulas to other families “domains”. This is an important property since it allows you to apply the same copula to other data you suspect might have similar dependence properties as another dataset.

In the case that we want to use variables of some domain (X₁ and X₂) and apply a copula to them from another domain then we must first map the variables to the new domain. X₁ → Y₁ & X₂ → Y₂.

**Example**

![copulas_p12.png](/copulas_p12.png) where Y1 and Y2 are normally distributed and linked by some correlation function ρ12.

How we Map (Mapping X₁ → Y₁) -->

![copulas_map.png](/copulas_map.png)

We set both CDFs equal to each other. Since we already know the CDF of the original domain and we know the CDF of the new domain but not the value y₁, the problem simply boils down to “for what value y1 do we need to get the same CDF as the left”.

Therefore y₁ is simply the inverse of the normal function:

![copulas_inv.png](/copulas_inv.png) The same can be done for X₂ → Y₂ and the final mapping becomes:
![copulas_guassian.png](/copulas_guassian.png) which is now a known function and called the “Gaussian copula”.
