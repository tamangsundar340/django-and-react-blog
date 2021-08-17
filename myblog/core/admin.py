from django_summernote.admin import SummernoteModelAdmin
from django.contrib import admin
from core.models import (
    SiteAdmin,
    Member,
    SiteInformation,
    Category,
    Blog,
    BlogComment,
    Newsletter,
    Lesson,
    ContactMessage,
    VideoCategory,
    VideoList,
    Videos,
)

class BlogAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    
class LessonAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)

class VideosAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)

# Register your models here.
admin.site.register(SiteAdmin)
admin.site.register(Member)
admin.site.register(SiteInformation)
admin.site.register(Category)
admin.site.register(Blog, BlogAdmin)
admin.site.register(BlogComment)
admin.site.register(Newsletter)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(VideoCategory)
admin.site.register(VideoList)
admin.site.register(Videos, VideosAdmin)
admin.site.register(ContactMessage)
