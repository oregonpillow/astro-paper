---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: A Comprehensive Guide to Synthetic Data and Privacy-Preserving Techniques  
slug: synthetic-data-privacy-preserving-techniques  
tags:  
  - synthetic-data  
  - data-privacy  
  - differential-privacy  
  - machine-learning  
  - data-anonymization  
description: Dive into the world of synthetic data, exploring traditional anonymization methods, modern privacy-preserving techniques like differential privacy, and the role of machine learning in generating synthetic datasets for secure and efficient data sharing.
---

## Importance of Data Privacy

We live in a data driven generation where big data, data mining and artificial intelligence (and other buzz words) are revolutionizing the ways we obtain value from data. The challenge is that both private companies and public entities have no way to easily share this data internally or externally. The main hurdles are: compliance laws, fears of data misuse, patient/client privacy and an inability to transfer data securely. If not for these limitations, it’s feasible that data scientists, dev-ops teams, research groups and other data professionals could provide significantly more efficient solutions to problems.

## Traditional Methods of Data Anonymization: Data Masking

Before the prevalence of machine learning, primitive methods to anonymize data often resulted in anonymized data at the cost of data utility. Statistical properties were often partially or completely destroyed and anonymization methods were generally weak at best and prone to reverse engineering which could expose PII (personal identifiable information).

### Substitution

Real values within the data are substituted with different “authentic” looking values. E.g replacing all real names in a column with randomly selected names from an external names list. In some cases substitution can involve replacing PII with randomly coded strings that only the original data curator could match back to the original record. E.g. replacing ‘John Smith’ with ‘R7JxvOAjtT’.

Pro: With substituted values, it’s impossible for anyone to know what the real values were since the original values have been completely removed from the dataset.

Con: Requires an accessible list of alternative “authentic” data to perform the substitution with. This may involve purchasing curated datasets such as lists of fake names, telephone numbers, addresses etc which can be expensive.

Con: Reverse Engineering. See case studies below.

### Randomization algorithms “shuffling”

Designed to randomize the order of data within the same column. Unlike substitution which replaces values with similar values from an external source, shuffling can be thought of as a form of internal substitution where it only substitutes values within the same column.

Pro: When used in conjunction with other data masking methods can be effective. E.g in a given dataset of supplier names and contract values, simply shuffling the supplier names would be ineffective as anyone with industry specific knowledge could piece together likely combinations of contract size and supplier. If the supplier names are masked and shuffled then it would be nearly impossible to figure out the suppliers.

Con: The dependence of being used with other masking methods to be effective can undermine its use.

Con: Reverse Engineering. When used in isolation, an attacker with domain knowledge of the data can simply swap column values around to arrive at original values.

### Nulling

Simply replacing confidential data with ‘null’ values like ‘NA’, ‘Null’, ‘Missing’ etc.

Pro: Easy solution to implement across various columns.

Con: Very obvious the data has been altered and is not completely original. Also lets the user know exactly which cells are missing which makes targeted reverse engineering attacks easier if no other masking methods are used.

Con: Nulled values can make datasets difficult to analyze since nulled purely numerical columns will become text or string.

### Deletion

Removing PII columns from the dataset.

Pro: Quick to implement.

Con: Requires a level of subjectivity as to what columns should be deleted. Defining which columns are considered PII is not always trivial since an attacker might use a combination of several non-PII columns to deduce PII.

Con: Deleting several columns could severely impact the utility of the masked dataset.

### Masking

Obscuring part of data values with stand-in symbols like ‘X’. E.g. credit card number XXX — XXXX — XXXX — 9823. Key difference between masking and nulling is that masking preserves the general format of the original data. For example I can still see that the credit card number was made up of 4 chunks of 4 numbers ‘XXXX’ even if I don’t know their value.

Pro: Obscures sensitive data without needing to completely delete or use nulling.

Con: May suffer from same data analysis problems as nulling since stand-in symbols reduce utility of data.

### Perturbation

Recommended Reading: https://pdfs.semanticscholar.org/f541/758a9179998a1b21d28d1feb90428dafad90.pdf

Data perturbation is a privacy-preserving method originally designed for electronic health records [1]. The goal is to inject “noise” into the data using either fake data or reusing data within the same dataset. Noise means that you are introducing uncertainty as to what the real values in the dataset are. Uncertainty = plausible deniability in data masking since an attacker has no way of knowing if he’s looking at a real data value or not. There are 2 approaches to perturbation. 1) Distribution approach — replace values in the data with fake values that still allow the dataset to maintain similar statistical properties. You can do this by replacing values from the same distribution sample or from the distribution itself. 2) Value distortion — add noise using multiplication or addition or other random processes of your choosing. E.g. adding a random number between 1–5 to ages of people or altering each salary in a list to be randomly +/- 10% of the true value, this way true salaries are not disclosed but trends are still observable.

Pro: Highly flexible solution that allows for infinitely many ways of adding noise to data while maintaining statistical properties.

Con: Reverse Engineering. See case studies below.

## Data leaks by traditional methods: Case Studies

### The Netflix Prize

In 2006 Netflix started “The Netflix Prize”, an online competition to design an algorithm to predict how a customer would rate a movie [2]. Netflix supplied a dataset of 100M ratings produced by 480K users for 17k movies. Netflix anonymized the dataset by using substitution to replace usernames with coded strings in combination with perturbation of some ratings with fake ratings. In 2008 two students at University of Texas, Austin published “Robust De-anonymization of Large Sparse Datasets” detailing a new class of statistical de-anonymization attacks against high-dimensional micro-data. By combining Netflix data with IMBD data the students were able to reveal who users were. The Netflix Prize is now ubiquitous among data leak examples.

### Sweeney vs Governor Weld [3]

Recommended reading: https://dataprivacylab.org/projects/identifiability/paper1.pdf

In 1997 Massachusetts Group Insurance Commission published hospital visit data for the purpose of improving healthcare and controlling costs. This publication caught the attention of Latanya Sweeney, then a graduate student at MIT studying computational disclosure. William Weld, then the governor of Massachusetts assured the public that PII such as names had been deleted from the data. Sweeney knew that governor Weld lived in Cambridge, a small town with only 7 zip-codes and had an intuition that the hospital data could be easily traced back to individuals with only basic knowledge about the targets. After purchasing a list of voter rolls from the city for $20 which included: names, addresses, zip codes, dob and sex . Sweeney was able to see that only a handful of people shared governor Weld’s publicly known dob and only one of them had a zip code that matched the part of town Weld resided in. Sweeney mailed the governor a list of his own diagnoses and prescriptions to his office. #savage. In 2000 Sweeney published another paper [4] stating that only 3 pieces of information: zip code, dob and gender are needed to identify 87% of Americans.

## A modern approach to anonymizing data: Differential Privacy

Recommended reading: https://arxiv.org/pdf/1911.12704.pdf

Today one of the most recent and popular forms of data anonymization is Differential Privacy which is essentially a much more formalized and parameterized form of perturbation [5]. Specifically, of the distribution approach. Differential Privacy provides a mathematical framework to quantify the minimum amount of noise that must be injected into a dataset to ensure data leakage does not exceed a certain limit “epsilon”.

The process of creating a private system (a system that can anonymize your data) consists of thinking about your end goal and then working backwards. You start by thinking about the specific features/columns of data that you wish to share. You then decide upon a formal privacy system which is a set of mathematical criteria that when satisfied means your dataset cannot leak data beyond a limit, epsilon. Then you choose your method of noise injection. The method of noise injection is arbitrary and there are many methods and algorithms you can use. The important thing is that whatever method you choose enables you to parameterize it so that it can be used to prove that it satisfies the conditions you specified in your privacy system. When these conditions are satisfied the system is said to be formally private.

## Where does the term “differential” come into play?

Differential refers to the fact that for a given computational task ‘T’ that injects noise into the dataset, there are numerous algorithms that can achieve the desired noise for a given epsilon. Because there are numerous differential ways of achieving epsilon privacy, we say the data is differentially private. As such, differential privacy is a definition, not an algorithm. It’s therefore possible to create a formally private system (satisfies conditions of your privacy system) but is not differentially private and has only 1 way of satisfying your system’s noise criteria. The choice to use differential privacy vs a formalized non-differential privacy system depends on the use case. Furthermore, the choice to use non-formalized “ad-hoc” noise injection can also be made but runs the risk of creating poorly anonymized data that can be easily reverse engineered by an attacker e.g. Netflix Prize.

## Why would anyone choose ad-hoc “non-formalized” data privacy?

Differential privacy can be complicated and timely to setup. Just as there is a tradeoff between level of anonymization and data utility, there is a tradeoff between effort and complexity of a privacy system. The biggest problem for differential privacy is that when epsilon is small (small level of data leakage) it becomes increasingly hard to find accurate (maintains statistical properties “well”) differentially private algorithms for ‘T’. In such circumstances someone might opt for a formal non-differentially private system. Failing the ability to find a single algorithm to satisfy a non-differentially private system then you might default to an ad-hoc, non-formalized system as a last resort.

Arguably one of the biggest benefits of a formalized privacy system is that it acts as a form of quality control since the system and its criteria are documented and proven. This is important within privacy sensitive industries such as health care, finance and banking. For many corporate institutions, nothing can be implemented unless it has clear justification, sound theory and traceable implementation to withstand the rigor of industrial and governmental audits. Frankly, the implementation of Netflix’s ad-hoc privacy system just 12 years ago would be laughable in terms of today’s privacy requirements. However, serves as an important reminder of how far privacy systems have developed.

Differential privacy addresses the paradox of learning nothing about an individual while learning useful information about a population [5]

## The Differential Privacy Toolbox

### DP-SYN

https://github.com/usnistgov/PrivacyEngCollabSpace/tree/master/tools/de-identification/Differential-Privacy-Synthetic-Data-Challenge-Algorithms/DPSyn

Paper: https://github.com/usnistgov/PrivacyEngCollabSpace/blob/master/tools/de-identification/Differential-Privacy-Synthetic-Data-Challenge-Algorithms/DPSyn/document/algorithm%20description.pdf

DP-FieldGroups https://github.com/gardn999/PrivacyEngCollabSpace/tree/master/tools/de-identification/Differential-Privacy-Synthetic-Data-Challenge-Algorithms/DPFieldGroups

Paper: https://github.com/gardn999/PrivacyEngCollabSpace/blob/master/tools/de-identification/Differential-Privacy-Synthetic-Data-Challenge-Algorithms/DPFieldGroups/gardn999_NistDp3_writeup_and_privacy_proof.pdf

### Graphical-model based estimation

https://github.com/ryan112358/private-pgm

Paper: https://arxiv.org/abs/1901.09136

### DP-SGD

https://github.com/tensorflow/privacy

Paper: https://arxiv.org/abs/1607.00133

### GUPT

https://github.com/prashmohan/GUPT

Paper: https://www.cs.umd.edu/~elaine/docs/gupt.pdf

### ARX Data Anonymization Tool

https://arx.deidentifier.org

Differentially Private Convex Optimization Benchmark — Collection of various differentially private convex optimization algorithms

https://github.com/sunblaze-ucb/dpml-benchmark

### Approximate Minima Perturbation (AMP)

Paper: http://www.uvm.edu/~jnear/papers/TPDPCO.pdf

### Private Stochastic Gradient Descent (SGD)

Paper: https://arxiv.org/abs/1405.7085

Paper: https://arxiv.org/pdf/1607.00133.pdf

### Private Convex Perturbation-Based Stochastic Gradient Descent

Paper: https://arxiv.org/pdf/1606.04722.pdf

### Private Frank-Wolfe

Paper: https://arxiv.org/pdf/1411.5417.pdf

### Duet

https://github.com/uvm-plaid/duet

Paper: https://arxiv.org/abs/1909.02481

### Ektelo

https://github.com/ektelo/ektelo

Paper: https://dl.acm.org/citation.cfm?id=3196921

### Privacy Protection Application

https://github.com/usdot-its-jpo-data-portal/privacy-protection-application

### Private Aggregation of Teacher Ensembles (PATE)

https://github.com/tensorflow/privacy/tree/master/research

Paper: https://arxiv.org/abs/1610.05755

Paper: https://arxiv.org/abs/1802.08908

### DPComp

web-based tool designed to help both practitioners and researchers assess the accuracy of state-of-the-art differentially private algorithms based on DPBench

https://www.dpcomp.org

https://github.com/dpcomp-org/dpcomp_core#dpbench

Paper: https://people.cs.umass.edu/~dzhang/dpcomp_demo.pdf

### DPBench

Framework for standardized evaluation of privacy algorithms

Paper: https://arxiv.org/abs/1512.04817

### Gretel

Package to create differentially private data using neural networks

https://github.com/gretelai/gretel-synthetics

https://medium.com/gretel-ai/using-generative-differentially-private-models-to-build-privacy-enhancing-synthetic-datasets-c0633856184

### Recommended reading:

https://towardsdatascience.com/understanding-differential-privacy-85ce191e198a

https://digitalcommons.ilr.cornell.edu/ldi/49/

https://www.sciencemag.org/news/2019/01/can-set-equations-keep-us-census-data-private

https://www.ijstr.org/final-print/mar2017/A-Review-Of-Synthetic-Data-Generation-Methods-For-Privacy-Preserving-Data-Publishing.pdf

MWEM https://arxiv.org/abs/1012.4763

Dual Query https://arxiv.org/abs/1402.1526

HDMM https://arxiv.org/abs/1808.03537

## Moving away from anonymizing methods: Synthesizing Data

As machine learning models became more sophisticated, ideas about data anonymization shifted. Instead of applying sophisticated algorithms to datasets research groups toyed with ideas of teaching models to recognize modes within the datasets and subsequently generating “synthesizing” data based on what the models learnt.

Decision Trees and Bayesian Networks provided a novel approach to anonymizing data by modeling discrete variables within tabular data and worked well. Subsequently copulas were used to model non-linearly correlated continuous variables. A benefit of using copulas was the ability to model a variety of distributions such as univariate data (Gaussian , Beta, Gamma, Gaussian KDE , Truncated Gaussian), bivariate data (Clayton, Frank, Gumbel, Ali–Mikhail–Haq, Joe) and multivariate data (Guassian, D-Vine, C-Vine, R-Vine).

Shameless plug: [Introduction to copulas](./introduction-to-copulas.md)

### What’s the difference between Synthesizing Data and Anonymizing Data?

Recommended reading: https://www-cdn.law.stanford.edu/wp-content/uploads/2019/01/Bellovin_20190129-1.pdf

Traditional anonymizing methods including formalized privacy systems can be thought of as distortion or sanitizing techniques, aimed at applying distortion and uncertainty directly to the original dataset. In a sense, you could say you “apply anonymization to the cloth itself”.

The key difference of synthesizing data is that the result is generated indirectly of the original dataset, since it is the result of “learnt” distributions. As such synthesized data can be considered “of a different cloth to the original” despite having similar properties to the original dataset.

One concern of synthesizing data is that if the model learns the join-distributions well, since synthesizing data consists of sampling randomly from the distributions learnt by the model there is a very small chance that a synthesized dataset could contain a combination of values, that by pure chance, correspond to either: an identical row as the original dataset or more likely: partial values within a row that can be found in the original dataset. This is particularly a problem if such values correspond to any of the high risk PII data such as real combinations of zip code, dob or gender. Therefore, combining synthetic data with differential privacy may provide the best of both worlds.

### A quick caution (rant) on nomenclature

The term “synthesized data” gets thrown around loosely within differential privacy. Common terms such as “differentially private synthesized data” or “synthetic data produced by differential privacy” are ambiguous as it is either meant to mean 1) that synthetic data has been produced using “of a different cloth” approach and sanitized further using differential privacy or 2) that differential privacy has been used to create an anonymized dataset that is unique to the original and therefore assumed to be“synthetic”. Unfortunately, the latter definition is used most commonly which I think is most ambiguous. I would personally argue that if the data is “of the same cloth” it hasn’t been synthesized; it’s been distorted/sanitized. Regardless, it’s something to keep in mind when you see differentially private data: Just because it’s synthetic doesn’t mean it’s differentially private and just because it’s differentially private doesn’t mean the data was originally synthesized using a learnt “of a different cloth” approach.

# The Synthetic Data Toolbox

## Decision Trees

### CART (Classification and Regression Trees) — Discrete Variables

https://github.com/ColleenBobbie/Cancer-Prediction

Paper: https://www.scb.se/contentassets/ca21efb41fee47d293bbee5bf7be7fb3/using-cart-to-generate-partially-synthetic-public-use-microdata.pdf

### SDT (Spacial Decomposition Trees) — Spacial Data

Paper: https://arxiv.org/abs/1103.5170

### PrivTree — Spatial Data

Paper: https://arxiv.org/abs/1601.03229

## Bayesian Networks

### CLBN

Paper: https://ieeexplore.ieee.org/document/1054142

### PrivBN (Private Data Release via Bayesian Networks)

Paper: http://dimacs.rutgers.edu/~graham/pubs/papers/PrivBayes.pdf

### DataSynthesizer

https://github.com/DataResponsibly/DataSynthesizer

Paper: https://faculty.washington.edu/billhowe/publications/pdfs/ping17datasynthesizer.pdf

## Copulas

### SDV-Copulas (Synthetic Data Vault)

https://github.com/sdv-dev/Copulas

### SDV-Modelling and sampling relational databases

https://github.com/sdv-dev/SDV

Paper: https://ieeexplore.ieee.org/document/7796926

# The latest approach to Synthesizing Data: GANs

Recommended reading: https://towardsdatascience.com/review-of-gans-for-tabular-data-a30a2199342

Generative Adversarial Networks (GANs) consist of 2 models pitted against each other in an iterative loop. One model playing the “generator” and the other playing the “discriminator”. In similar fashion to generating deep-fakes with GANs, they can also be used to generate synthetic tabular data which is very similar to the original. The same foundations of adding noise to a dataset also apply to GANs except that noise is added using weights and filters applied to the neural networks. Another difference between GANs used for images and GANs used for synthetic data is that GANs for images generally use Convolution Neural Networks (CNNs) because the context of generating / detecting fake images requires the model to iterate through layers of an image without one layer affecting the generation of the next. For example, if the discriminator is using an edge detection filter then you don’t want the edge filter’s detection ability to change based on previous filters applied to the image [6]. In essence, you don’t want the filter to have a memory.

A GAN for synthesizing tabular data will generally use a Recurrent Neural Network (RNN) for the architecture because you can implement Long Short Term Memory (LSTM). A key difference between an LSTM network and a CNN is that the LSTM offers the ability to add memory to the network which allows for learning long term dependencies, which is particularly important when you want a GAN to recognize correlated attributes within a dataset.

# The GAN Toolbox

## MedGAN

https://github.com/mp2893/medgan

Paper: https://arxiv.org/abs/1806.06397

Related Paper: https://arxiv.org/abs/1703.06490

## VeeGAN

https://github.com/akashgit/VEEGAN

Paper: https://arxiv.org/abs/1705.07761

## TableGAN

https://github.com/mahmoodm2/tableGAN

Paper: http://www.vldb.org/pvldb/vol11/p1071-park.pdf

## ehrGAN

Paper: https://arxiv.org/abs/1709.01648

## PATE-GAN

Paper: https://openreview.net/pdf?id=S1zk9iRqF7

Related Paper: https://arxiv.org/pdf/1906.09338.pdf

## DP-WGAN

https://github.com/nesl/nist_differential_privacy_synthetic_data_challenge

Paper: https://github.com/nesl/nist_differential_privacy_synthetic_data_challenge/blob/master/reports/UCLANESL_solution_privacy_proof.pdf

Related Paper: https://papers.nips.cc/paper/7159-improved-training-of-wasserstein-gans.pdf

## DP-GAN (Xinyang Zhang, Shouling Ji, Ting Wang)

https://github.com/alps-lab/dpgan

Paper: https://arxiv.org/pdf/1801.01594.pdf

## DP-GAN (same name) (Liyang Xie , Kaixiang Lin , Shu Wang , Fei Wang , Jiayu Zhou)

https://github.com/illidanlab/dpgan

Paper: https://arxiv.org/pdf/1802.06739.pdf

## TGAN

https://github.com/sdv-dev/TGAN

Paper: https://arxiv.org/abs/1811.11264

## CTGAN

https://github.com/sdv-dev/CTGAN

Paper: https://arxiv.org/abs/1907.00503

# The future of synthetic data?

So far we’ve seen that machine learning is very effective at learning from data and being able to reproduce synthetic data that:

- Maintains same statistical distributions as original data

- Learns the correlations between different columns

- Provides excellent data anonymization

- Can be scaled to any size

- Can be sampled from unlimited times

Producing synthetic data is extremely cost effective when compared to data curation services and the cost of legal battles when data is leaked using traditional methods. Increasing research is being done to compare the quality of data analysis performed on original versus synthetic datasets. Furthermore, some researchers have such confidence in synthetic data that “scientists can be as productive with synthesized data as they can with control data” [6].

As data privacy becomes increasingly valued by the public it’s an area of research that is likely to keep growing at an exponential rate.

· 51% Senior corporate respondents said that lack of sharing data between departments was a key issue in data strategy. [7]
· Consumer data shows that…
86% want to exercise greater control over the data companies hold about them

76% worried sharing data makes them targets for marketing campaigns

34% have provided made-up personal details to avoid giving away personal data [8]

· Data masking market is expected to grow at 14.8% compounded annual growth rate (CAGR) and worth $767M by 2022 [9]
· Global Privacy Management Software market expected to grow at 33.1%(CAGR). [10]
Feel free to message me with additional models and I’ll add them to the list.

[1] D, V., Kumar N, K., & R.Lakshmi Tulasi, D. (2018). A Privacy-Preserving Technique for Incremental Dataset on Cloud by Synthetic Data Perturbation. International Journal of Engineering & Technology, 7(3.34), 331–334. http://dx.doi.org/10.14419/ijet.v7i3.34.19219

[2] A. Narayanan and V. Shmatikov, “Robust De-anonymization of Large Sparse Datasets,” 2008 IEEE Symposium on Security and Privacy (sp 2008), Oakland, CA, 2008, pp. 111–125. https://ieeexplore.ieee.org/document/4531148

[3] Barth-Jones, Daniel, The ‘Re-Identification’ of Governor William Weld’s Medical Information: A Critical Re-Examination of Health Data Identification Risks and Privacy Protections, Then and Now (July 2012). http://dx.doi.org/10.2139/ssrn.2076397

[4] L. Sweeney, Simple Demographics Often Identify People Uniquely. Carnegie Mellon University, Data Privacy Working Paper 3. Pittsburgh 2000. https://dataprivacylab.org/projects/identifiability/paper1.pdf

[5] Cynthia Dwork and Aaron Roth. 2014. The Algorithmic Foundations of Differential Privacy. Found. Trends Theor. Comput. Sci. 9, 3–4 (August 2014), 211–407. DOI: https://doi.org/10.1561/0400000042

[6] Bellovin, Steven M. and Dutta, Preetam K. and Reitinger, Nathan, Privacy and Synthetic Datasets (August 20, 2018). Stanford Technology Law Review, Forthcoming. http://dx.doi.org/10.2139/ssrn.3255766

[7] David Rogers, Don Sexton. Marketing ROI in the Era of Big Data: The 2012 BRITE/NYAMA Marketing in Transition Study. Columbia Business School. 2012. https://www8.gsb.columbia.edu/globalbrands/sites/globalbrands/files/images/2012-BRITE-NYAMA-Marketing-ROI-Study.pdf

[8] Matthew Quint and David Rogers. What Is the Future of Data Sharing? CONSUMER MINDSETS AND THE POWER OF BRANDS. Columbia Business School. Oct, 2015. https://www8.gsb.columbia.edu/globalbrands/sites/globalbrands/files/images/The_Future_of_Data_Sharing_Columbia-Aimia_October_2015.pdf

[9] Markets and Markets. Data Masking Market by Data Masking Type (Static and Dynamic), Component (Software and Services), Deployment Type, Organization Size, Business Function (Finance, Marketing & Sales, Operations, and Legal), Vertical, and Region — Global Forecast to 2022. Dec, 2017. https://www.marketsandmarkets.com/Market-Reports/data-masking-market-24977919.html

[10] MarketWatch. At 33.1% CAGR, Privacy Management Software Market Size Set to Register 3290 million USD by 2025. April 6 2020. https://www.marketwatch.com/press-release/at-331-cagr-privacy-management-software-market-size-set-to-register-3290-million-usd-by-2025-2020-04-06
