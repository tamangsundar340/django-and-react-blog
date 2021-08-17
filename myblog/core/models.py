from django.db import models
from django.contrib.auth.models import Group,User
from django.db.models.fields import CharField
from django.utils import timezone
from django.utils.text import slugify
from django.conf import settings


# Create your models here.        
class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    update_at  = models.DateTimeField(auto_now=True)
    is_active  = models.BooleanField(default=True, null=True, blank=True)
    
    class Meta:
        abstract = True
        
    def save(self, *args, **kwargs):
        self.update_at = timezone.now()
        return super().save(*args, **kwargs)
    
    def timestamp_pretty(self):
        return self.created_at.strftime('%b %e, %Y')


class SiteAdmin(TimeStamp):
    user  = models.OneToOneField(User, on_delete=models.CASCADE)
    name  = models.CharField(max_length=50)
    image = models.ImageField(upload_to="user/SiteAdmin", null=True, blank=True)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        group, group_created = Group.objects.get_or_create(name="SiteAdmin")
        self.user.groups.add(group)
        super().save(*args, **kwargs)
        

class Member(TimeStamp):
    user           = models.OneToOneField(User, on_delete=models.CASCADE)
    name           = models.CharField(max_length=200)
    image          = models.ImageField(upload_to="user/member", null=True, blank=True)
    mobile         = models.CharField(max_length=200, null=True, blank=True)
    street_address = models.CharField(max_length=200, null=True, blank=True)
    
    def getFullName(self):
        return self.user.first_name + ' ' + self.user.last_name

    def save(self, *args, **kwargs):
        group, group_create = Group.objects.get_or_create(name="Member")
        self.user.groups.add(group)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username

        
class SiteInformation(TimeStamp):
    title                   = models.TextField(max_length=50, blank=True, null=True)
    email                   = models.EmailField()
    phone_number            = models.PositiveIntegerField(blank=True, null=True)
    address                 = models.TextField(max_length=200, blank=True, null=True)
    profile_image           = models.ImageField(upload_to="profile/pic", null=True, blank=True)
    about_us                = models.TextField(blank=True, null=True)
    github                  = models.CharField(max_length=200,null=True,blank=True)
    facebook                = models.CharField(max_length=200,null=True,blank=True)
    instagram               = models.CharField(max_length=200,null=True,blank=True)
    youtube                 = models.CharField(max_length=200,null=True,blank=True)
    twitter                 = models.CharField(max_length=200,null=True,blank=True)
    viber                   = models.CharField(max_length=200,null=True,blank=True)
    privacy_policy          = models.TextField(blank=True, null=True)
    terms_conditions        = models.TextField(blank=True, null=True)
    fb_messenger_script     = models.CharField(max_length=1024, null=True, blank=True)
    google_analytics_script = models.CharField(max_length=500, null=True, blank=True)
    fb_pixel_script         = models.CharField(max_length=4000, null=True, blank=True)
    detail_pixel            = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    
    
class ContactMessage(TimeStamp):
    fullname      = models.CharField(max_length=100,null=True, blank=True)
    email         = models.EmailField(null=True, blank=True)
    subject       = models.CharField(max_length=250,null=True, blank=True)
    message       = models.TextField()

    def __str__(self):
        return self.fullname

    class Meta:
        verbose_name_plural = "ContactMessages"
    

class Category(TimeStamp):
    title = models.CharField(max_length=20)
    slug  = models.SlugField(null=True, blank=True, unique=True)

    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    
    def blog_count(self):
        return Blog.objects.filter(categories=self).count()


class Blog(TimeStamp):
    title      = models.CharField(max_length=100)
    slug       = models.SlugField(null=True, blank=True, unique=True)
    overview   = models.TextField(null=True, blank=True)
    content    = models.TextField(null=True, blank=True)
    views      = models.PositiveIntegerField(default=0)
    author     = models.ForeignKey(SiteAdmin, on_delete=models.CASCADE)
    thumbnail  = models.ImageField(upload_to="Blog/img", null=True, blank=True)
    categories = models.ForeignKey(Category, on_delete=models.CASCADE)
    featured   = models.BooleanField(default=False)
    
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    
    def comment_count(self):
        return BlogComment.objects.filter(blog=self).count()
    
    
    @property
    def lessons(self):
        return self.lesson_set.all().order_by('id')
    
    
class BlogComment(TimeStamp):
    blog   = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user   = models.CharField(max_length=50,blank=True, null=True)
    email  = models.EmailField()
    text   = models.TextField(max_length=200)
    reply  = models.ForeignKey("self", on_delete=models.CASCADE,
        null=True, blank=True, related_name="replies")

    def __str__(self):
        return f"By: ({self.user}) for ({self.blog})."
    

class Lesson(TimeStamp):
    title      = models.CharField(max_length=30)
    slug       = models.SlugField(unique=True)
    topic      = models.ForeignKey(Blog,on_delete=models.CASCADE)
    content    = models.TextField()
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    
    
class VideoCategory(TimeStamp):
    title         = models.CharField(max_length=30)
    slug          = models.SlugField(null=True, blank=True, unique=True)
    overview      = models.TextField()
    thumbnail     = models.ImageField(upload_to="video/img", null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        return super().save(*args, **kwargs)
    
    
    
class VideoList(TimeStamp):
    topic          = models.ForeignKey(VideoCategory, on_delete=models.CASCADE)
    title          = models.CharField(max_length=30)
    slug           = models.SlugField(null=True, blank=True, unique=True)
    thumbnail      = models.ImageField(upload_to="videothumbnail/img", null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        return super().save(*args, **kwargs)
    

class Videos(TimeStamp):
    videolist       = models.ForeignKey(VideoList, on_delete=models.CASCADE)
    slug            = models.SlugField(null=True, blank=True, unique=True)
    video_url       = models.CharField(max_length=250)
    content         = models.TextField()
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        return super().save(*args, **kwargs)
    
    
    
class Newsletter(TimeStamp):
    email  = models.EmailField()
