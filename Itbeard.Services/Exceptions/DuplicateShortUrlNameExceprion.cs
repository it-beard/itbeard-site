using System;

namespace Itbeard.Services.Exceptions
{
    public class DuplicateShortUrlNameException : Exception
    {
        public DuplicateShortUrlNameException(string msg) :base(msg) {}
    }
}