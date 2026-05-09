#!/usr/bin/env python3
"""Module for listing all documents in a MongoDB collection."""


def list_all(mongo_collection):
    """
    main method
    """
    documents = list(mongo_collection.find())
    return documents if documents else []
