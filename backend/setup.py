# Fixes ModuleNotFound: Relative Package Imports
# To run the setup.py:
#   pip install -e .

from setuptools import find_packages, setup

setup(name="packagesManager", version="1.0", packages=find_packages())
