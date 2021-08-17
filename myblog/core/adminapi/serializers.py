from django.db.models import fields
from rest_framework import serializers
from core.models import (
    SiteAdmin,
    Member,
    SiteInformation,
    Category,
    Blog,
    BlogComment,
    Lesson,
    Newsletter,
)

# SiteAdmin serialization
class SiteAdminSerializers(serializers.ModelSerializer):
    class Meta:
        model  = SiteAdmin
        fields = "__all__"
        
        
# Member serialization
class MemberSerializers(serializers.ModelSerializer):
    class Meta:
        model  = Member
        fields = "__all__"
        
        
# SiteInformation serialization
class SiteInformationSerializers(serializers.ModelSerializer):
    class Meta:
        model  = SiteInformation
        fields = "__all__"
        

# Category serialization
class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model  = Category
        fields = "__all__"
        

# Blog serialization
class BlogSerializers(serializers.ModelSerializer):
    class Meta:
        model  = Blog
        fields = "__all__"


# BlogComment serialization
class BlogCommentSerializers(serializers.ModelSerializer):
    class Meta:
        model  = BlogComment
        fields = "__all__"
        
        
# Lesson serialization
class LessonSerializers(serializers.ModelSerializer):
    class Meta:
        model  = Lesson
        fields = "__all__"
    
        
# Newsletter serialization
class NewsletterSerializers(serializers.ModelSerializer):
    class Meta:
        model  = Newsletter
        fields = "__all__"