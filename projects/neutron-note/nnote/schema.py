
import graphene

import journal.schema


class Query(journal.schema.Query, graphene.ObjectType):
  pass
  
schema = graphene.Schema(query=Query)
